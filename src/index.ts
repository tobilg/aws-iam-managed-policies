import managedPolicies from "./managedPolicies.json";
import { ManagedPolicies, ManagedPolicy } from '../src/types';

const sortObjectByPropertyNames = (obj) => Object.keys(obj).sort().reduce((objEntries, key) => {
  objEntries[key] = obj[key];
  return objEntries;
}, {});

export const listPolicies = (): string[] => {
  return Object.keys(sortObjectByPropertyNames(managedPolicies));
}

export const getPolicyCount = (): number => {
  return Object.keys(managedPolicies).length;
}

export const getPolicyByName = (policyName: string): ManagedPolicy | undefined => {
  return managedPolicies[policyName];
}

export const getLatestPolicyDocument = (policyName: string): object | undefined => {
  const policy = managedPolicies[policyName];

  if (policy) {
    const latestVersionId = policy.latestVersionId;
    return policy.versions[latestVersionId].document;
  } else {
    return undefined;
  }
}

export const getPolicyDocumentByVersion = (policyName: string, policyVersion: number): object | undefined => {
  const policy = managedPolicies[policyName];

  if (policy) {
    return policy.versions[policyVersion].document;
  } else {
    return undefined;
  }
}

export {
  ManagedPolicies,
}
