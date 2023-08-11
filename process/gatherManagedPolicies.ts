import { IAM } from 'aws-sdk';
import { join } from 'path';
import { getPolicies, writeFileAsJSON, updatePolicies } from './utils/common';
import currentManagedPolicies from '../src/managedPolicies.json';
import { ManagedPolicies } from '../src/types';

const run = async () => {
  // Get list of all current IAM Managed Policies
  const policies: IAM.Policy[] = await getPolicies({});

  const hasChanges = await updatePolicies(currentManagedPolicies as unknown as ManagedPolicies, policies);

  if (hasChanges) {
    // Write index
    writeFileAsJSON(currentManagedPolicies, join(__dirname, '../src'), 'managedPolicies.json');
  } else {
    console.log(`No changes detected!`);
  }
  
}

run();
