import { IAM } from 'aws-sdk';
import { join } from 'path';
import pLimit from 'p-limit';
import { getPolicies, getPolicyDetails, writePolicyFile, writeFileAsJSON, ManagedPolicyMetadata } from './utils/common';
import currentManagedPolicies from '../src/managedPolicies.json';

// Limit to 10 parallel API requests to avoid throttling
const limit = pLimit(10);

// Detect changes
let hasChanges = false;

const run = async () => {
  // Get list of all current IAM Managed Policies
  const policies: IAM.Policy[] = await getPolicies({});

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

  if (hasChanges) {
    // Write index
    writeFileAsJSON(currentManagedPolicies, join(__dirname, '../data/src'), 'managedPolicies.json');
  } else {
    console.log(`No changes detected!`);
  }
  
}

run();
