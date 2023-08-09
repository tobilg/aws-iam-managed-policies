import { IAM } from 'aws-sdk';
import { join } from 'path';
import { getPolicies, writeFileAsJSON, backfillVersions } from './utils/common';
import { ManagedPolicies } from '../src/types';

const run = async () => {
  // Get list of all current IAM Managed Policies
  const policies: IAM.Policy[] = await getPolicies({});

  const managedPolicies: ManagedPolicies = {};

  // Backfill all historical policy versions for this policy
  const policyPromises = policies.map(policy => {
    managedPolicies[policy.PolicyName!] = {
      arn: policy.Arn!,
      latestVersionId: policy.DefaultVersionId!,
      versionsCount: parseInt(policy.DefaultVersionId!.replace('v', '')),
      versions: {},
      createdDate: policy.CreateDate!,
      lastUpdatedDate: policy.UpdateDate!,
    }
    return backfillVersions(policy, managedPolicies)
  }).flat();

  // Run API calls
  await Promise.all(policyPromises);

  const managedPoliciesPath = join(__dirname, '../src');

  writeFileAsJSON(managedPolicies, managedPoliciesPath, 'managedPolicies.json');
}

run();
