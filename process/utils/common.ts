import { IAM } from 'aws-sdk';
import { mkdirp } from 'mkdirp';
import { writeFileSync } from 'fs';
import { join } from 'path';
import pLimit from 'p-limit';
import { ManagedPolicies } from '../../src/types';

export interface GetPolicyProps {
  marker?: string,
  previous?: IAM.Policy[],
}

export interface ManagedPolicyMetadata {
  arn: string;
  name: string;
  versionId: string;
  document: object;
  createdDate?: Date;
  updatedDate?: Date;
}
  
export interface ManagedPolicyIndexEntry {
  arn: string;
  versionId: string;
  createdDate?: Date;
  updatedDate?: Date;
}

export interface ManagedPolicyIndex {
  [key: string]: ManagedPolicyIndexEntry;
}

// Instantiate IAM service
const iam = new IAM();

// Check if running in CI
const { CI } = process.env;

// Store parallelism
let parallelism = 10;

// Reduce parallelism when running in CI
if (CI) {
  parallelism = 3;
}

// Limit to 10 parallel API requests to avoid throttling
const limit = pLimit(parallelism);

const wait = (timeInMs: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeInMs);
  })
}
  
export const writePolicyFile = (data: object, policyName: string, policyVersion: string) => {
  // Create base path
  const policyPath = join(__dirname, '../data/json', policyName, policyVersion);
  // Write policy file
  writeFileAsJSON(data, policyPath, 'policy.json');
}
  
export const writeFileAsJSON = (data: object, filePath: string, fileName: string) => {
  // Ensure base path exists
  mkdirp.sync(filePath);
  // Write file
  writeFileSync(`${filePath}/${fileName}`, JSON.stringify(data, null, 2));
}
  
export const getPolicies = (props: GetPolicyProps): Promise<IAM.Policy[]> => {
  let params = {
    Scope: 'AWS',
    MaxItems: 1000, // Try to avoid throttling in the CI
    Marker: props?.marker,
  }

  return iam.listPolicies(params).promise().then(data => {
    let policies: IAM.Policy[] = data.Policies as IAM.Policy[];
    console.log(`Found ${policies?.length} policies...`);
    if (props?.previous) {
      policies = props?.previous?.concat(policies);
    }
    if (data.IsTruncated){
      return getPolicies({ marker: data.Marker, previous: policies });
    }
    return policies;
  });
}

export const getPolicyDetails = (policy: IAM.Policy): Promise<ManagedPolicyMetadata> => {
  return new Promise(async (resolve, reject) => {
    const policyVersion = await iam.getPolicyVersion({
      PolicyArn: policy.Arn!,
      VersionId: policy.DefaultVersionId!,
    }).promise();

    // Try to avoid throttling
    if (CI) {
      await wait(250);
    }
    
    const policyDetail: ManagedPolicyMetadata = {
      arn: policy.Arn!,
      name: policy.PolicyName!,
      versionId: policy.DefaultVersionId!,
      document: JSON.parse(decodeURIComponent(policyVersion.PolicyVersion?.Document as string)),
      createdDate: policy?.CreateDate,
      updatedDate: policy?.UpdateDate,
    }

    resolve(policyDetail);
  })
}

export const getAndStoreHistoricalPolicy = (name: string, arn: string, versionId: string, managedPolicies: ManagedPolicies): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const policyVersion = await iam.getPolicyVersion({
        PolicyArn: arn,
        VersionId: versionId,
      }).promise();

      const policyJSON = JSON.parse(decodeURIComponent(policyVersion.PolicyVersion?.Document as string));
  
      writePolicyFile(policyJSON, name, versionId);

      managedPolicies[name].versions[versionId] = {
        createdDate: policyVersion.PolicyVersion?.CreateDate,
        document: policyJSON,
      }
  
      console.log(`Wrote version ${versionId} for policy ${name}`);

      resolve(true);
    } catch (err) {
      console.log(`Tried to write version ${versionId} for policy ${name}, but got error: '${err.message}'`);
      resolve(false);
    }
  })
}

export const backfillVersions = (policy: IAM.Policy, managedPolicies: ManagedPolicies): Promise<boolean>[] => {
  const latestVersionId = policy.DefaultVersionId;
  const versions = parseInt(latestVersionId!.replace('v', ''));

  console.log(`Found ${versions} versions for policy ${policy.PolicyName}`);

  const promises: Promise<boolean>[] = [];

  for (let i = 1; i <= versions; i++) {
    promises.push(limit(() => getAndStoreHistoricalPolicy(policy.PolicyName!, policy.Arn!, `v${i}`, managedPolicies)))
  }

  return promises;
}

export const updatePolicies = async (currentManagedPolicies: ManagedPolicies, policies: IAM.Policy[]): Promise<boolean> => {
  // Detect changes
  let hasChanges = false;

  // Get all current policy versions
  const policyPromises = policies.map(policy => (
    limit(() => getPolicyDetails(policy))
  ));

  // Run API calls
  const result: ManagedPolicyMetadata[] = await Promise.all(policyPromises);

  // Iterate over policies
  result.forEach((policy) => {
    // Lookup policy
    if (currentManagedPolicies[policy.name]) {
      if (currentManagedPolicies[policy.name].versions[policy.versionId]) {
        console.log(`Policy '${policy.name}' exists with version '${policy.versionId}'!`);
      } else {
        // Write current policy file
        writePolicyFile(policy.document, policy.name, policy.versionId);
        console.log(`Created new version '${policy.versionId}' for policy '${policy.name}'!`);

        hasChanges = true;
      }
    } else {
      console.log(`Policy '${policy.name}' doesn't exist, creating!`);

      // Create policy
      currentManagedPolicies[policy.name] = {
        arn: policy.arn,
        latestVersionId: policy.versionId,
        versionsCount: parseInt(policy.versionId.replace('v', '')),
        versions: {},
        createdDate: policy.createdDate,
        lastUpdatedDate: policy.updatedDate,
      }

      // Create policy version
      currentManagedPolicies[policy.name].versions[policy.versionId] = {
        createdDate: policy.createdDate,
        document: policy.document,
      }

      // Write current policy file
      writePolicyFile(policy.document, policy.name, policy.versionId);
      console.log(`Created new version '${policy.versionId}' for policy '${policy.name}'!`);

      hasChanges = true;
    }
  });

  return hasChanges;
}
