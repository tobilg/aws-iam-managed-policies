import { detailedDiff } from 'deep-object-diff';
import managedPolicies from "./managedPolicies.json";
import { ManagedPolicies, ManagedPolicy } from '../src/types';

const sortObjectByPropertyNames = (obj) => Object.keys(obj).sort().reduce((objEntries, key) => {
  objEntries[key] = obj[key];
  return objEntries;
}, {});

/**
 * Retrieve a list of all included IAM Managed Polcies.
 * @returns {Array} An array of IAM Managed Policy names.
 */
export const listPolicies = (): string[] => {
  return Object.keys(sortObjectByPropertyNames(managedPolicies));
}

/**
 * Get the number of included IAM Managed Polcies.
 * @returns {number} The count of IAM Managed Policies.
 */
export const getPolicyCount = (): number => {
  return Object.keys(managedPolicies).length;
}

/**
 * Get the IAM Managed Policy by name with the full version history
 * @param {string} policyName The IAM Managed Policy name.
 * @returns {object} The IAM Managed Policy if found.
 * @throws Will throw an error if not found by the name.
 */
export const getPolicyByName = (policyName: string): ManagedPolicy => {
  const policy = managedPolicies[policyName];

  if (policy) {
    return policy;
  } else {
    throw new Error(`IAM Managed Policy '${policyName}' wasn't found!`);
  }
}

/**
 * Get the latest policy document for a IAM Managed Policy by name
 * @param {string} policyName The IAM Managed Policy name.
 * @returns {object} The IAM Managed Policy document if found.
 * @throws Will throw an error if not found by the name.
 */
export const getLatestPolicyDocument = (policyName: string): object => {
  const policy = managedPolicies[policyName];

  if (policy) {
    const latestVersionId = policy.latestVersionId;
    return policy.versions[latestVersionId].document;
  } else {
    throw new Error(`IAM Managed Policy '${policyName}' wasn't found!`);
  }
}

/**
 * Get the latest policy document for a IAM Managed Policy by name
 * @param {string} policyName The IAM Managed Policy name.
 * @param {number} policyVersion The version id of the IAM Managed Policy.
 * @returns {object} The IAM Managed Policy document if found.
 * @throws Will throw an error if not found by the name.
 */
export const getPolicyDocumentByVersion = (policyName: string, policyVersion: number): object => {
  const policy = managedPolicies[policyName];

  if (policy && policy.versions[`v${policyVersion}`]) {
    return policy.versions[`v${policyVersion}`].document;
  } else {
    throw new Error(`IAM Managed Policy '${policyName}' wasn't found in version '${policyVersion}'!`);
  }
}

/**
 * Get a diff of the policy documents for two versions of a IAM Managed Policy
 * @param {string} policyName The IAM Managed Policy name.
 * @param {number} oldPolicyVersion The old version id of the IAM Managed Policy.
 * @param {number} newPolicyVersion The new version id of the IAM Managed Policy.
 * @returns {object} The diff of the IAM Managed Policy document versions if found.
 * @throws Will throw an error if not found by the name or the respective policy document versions.
 */
export const getPolicyDiffByVersions = (policyName: string, oldPolicyVersion: number, newPolicyVersion: number): object => {
  const policy = managedPolicies[policyName];

  if (policy) {
    if (!policy.versions[`v${oldPolicyVersion}`]) {
      throw new Error(`IAM Managed Policy '${policyName}' wasn't found in version '${oldPolicyVersion}'!`);
    }
    if (!policy.versions[`v${newPolicyVersion}`]) {
      throw new Error(`IAM Managed Policy '${policyName}' wasn't found in version '${newPolicyVersion}'!`);
    }
    return detailedDiff(policy.versions[`v${oldPolicyVersion}`].document, policy.versions[`v${newPolicyVersion}`].document);
  } else {
    throw new Error(`IAM Managed Policy '${policyName}' wasn't found!`);
  }
}

export {
  ManagedPolicies,
}
