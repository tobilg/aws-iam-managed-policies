export interface ManagedPolicies {
  [key: string]: ManagedPolicy;
}

export interface ManagedPolicy {
  arn: string;
  latestVersionId: string;
  versionsCount: number;
  versions: ManagedPolicyVersions;
  createdDate?: Date;
  lastUpdatedDate?: Date;
}

export interface ManagedPolicyVersions {
  [key: string]: ManagedPolicyVersion;
}

export interface ManagedPolicyVersion {
  createdDate?: Date;
  document: object;
}
