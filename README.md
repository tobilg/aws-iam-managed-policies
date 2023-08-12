# aws-iam-managed-policies
Automatically populated (every morning at 6AM UTC) repository of AWS IAM Managed Policies, which also updates a npm package containing the full history of AWS IAM Managed Policies.

## Data
The raw IAM Managed Policies data can be found in the [data/json](https://github.com/tobilg/aws-iam-managed-policies/tree/main/data/json) directory. It is categorized by Managed Policy name and version id.

## Installation
You can install the npm package like this:

```bash
npm i --save aws-iam-managed-policies
```

## API Docs
The API docs can be found at [https://tobilg.github.io/aws-iam-managed-policies](https://tobilg.github.io/aws-iam-managed-policies).

## Usage examples
```javascript
const { 
  getPolicyCount,
  listPolicies,
  getPolicyByName,
  getLatestPolicyDocument,
  getPolicyDocumentByVersion,
  getPolicyDiffByVersions
} = require('aws-iam-managed-policies');
```

### Get the number of Managed Policies
```javascript
console.log(getPolicyCount());
/*
1117
*/
```

### Get the first 10 policy names
```javascript
console.log(listPolicies().filter((p, i) => i <= 9));
/*
[
  "APIGatewayServiceRolePolicy",
  "AWSAccountActivityAccess",
  "AWSAccountManagementFullAccess",
  "AWSAccountManagementReadOnlyAccess",
  "AWSAccountUsageReportAccess",
  "AWSAgentlessDiscoveryService",
  "AWSAppFabricFullAccess",
  "AWSAppFabricReadOnlyAccess",
  "AWSAppFabricServiceRolePolicy",
  "AWSAppMeshEnvoyAccess"
]
*/
```

### Get policy by name 'AdministratorAccess'
```javascript
console.log(getPolicyByName('AdministratorAccess'));
/*
{
  "arn": "arn:aws:iam::aws:policy/AdministratorAccess",
  "latestVersionId": "v1",
  "versionsCount": 1,
  "versions": {
    "v1": {
      "createdDate": "2015-02-06T18:39:46.000Z",
      "document": {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
          }
        ]
      }
    }
  },
  "createdDate": "2015-02-06T18:39:46.000Z",
  "lastUpdatedDate": "2015-02-06T18:39:46.000Z"
}
*/
```

### Get latest policy document for policy 'AdministratorAccess'
```javascript
console.log(getLatestPolicyDocument('AdministratorAccess'));
/*
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
*/
```

### Get version '5' policy document for policy 'ViewOnlyAccess'
```javascript
console.log(getPolicyDocumentByVersion('ViewOnlyAccess', 5));
/*
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "acm:ListCertificates",
        "athena:List*",
        "aws-marketplace:ViewSubscriptions",
        "autoscaling:Describe*",
        "batch:ListJobs",
        "clouddirectory:ListAppliedSchemaArns",
        "clouddirectory:ListDevelopmentSchemaArns",
        "clouddirectory:ListDirectories",
        "clouddirectory:ListPublishedSchemaArns",
        "cloudformation:List*",
        "cloudformation:DescribeStacks",
        "cloudfront:List*",
        "cloudhsm:ListAvailableZones",
        "cloudhsm:ListLunaClients",
        "cloudhsm:ListHapgs",
        "cloudhsm:ListHsms",
        "cloudsearch:List*",
        "cloudsearch:DescribeDomains",
        "cloudtrail:DescribeTrails",
        "cloudtrail:LookupEvents",
        "cloudwatch:List*",
        "cloudwatch:GetMetricData",
        "codebuild:ListBuilds*",
        "codebuild:ListProjects",
        "codecommit:List*",
        "codedeploy:List*",
        "codedeploy:Get*",
        "codepipeline:ListPipelines",
        "codestar:List*",
        "codestar:Verify*",
        "cognito-idp:List*",
        "cognito-identity:ListIdentities",
        "cognito-identity:ListIdentityPools",
        "cognito-sync:ListDatasets",
        "connect:List*",
        "config:List*",
        "config:Describe*",
        "datapipeline:ListPipelines",
        "datapipeline:DescribePipelines",
        "datapipeline:GetAccountLimits",
        "devicefarm:List*",
        "directconnect:Describe*",
        "discovery:List*",
        "dms:List*",
        "ds:DescribeDirectories",
        "dynamodb:ListTables",
        "ec2:DescribeAccountAttributes",
        "ec2:DescribeAddresses",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeBundleTasks",
        "ec2:DescribeClassicLinkInstances",
        "ec2:DescribeConversionTasks",
        "ec2:DescribeCustomerGateways",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeExportTasks",
        "ec2:DescribeFlowLogs",
        "ec2:DescribeHost*",
        "ec2:DescribeIdentityIdFormat",
        "ec2:DescribeIdFormat",
        "ec2:DescribeImage*",
        "ec2:DescribeImport*",
        "ec2:DescribeInstance*",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeKeyPairs",
        "ec2:DescribeMovingAddresses",
        "ec2:DescribeNatGateways",
        "ec2:DescribeNetwork*",
        "ec2:DescribePlacementGroups",
        "ec2:DescribePrefixLists",
        "ec2:DescribeRegions",
        "ec2:DescribeReserved*",
        "ec2:DescribeRouteTables",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSnapshot*",
        "ec2:DescribeSpot*",
        "ec2:DescribeSubnets",
        "ec2:DescribeVolume*",
        "ec2:DescribeVpc*",
        "ec2:DescribeVpnGateways",
        "ecr:DescribeRepositories",
        "ecr:ListImages",
        "ecs:List*",
        "ecs:Describe*",
        "elasticache:Describe*",
        "elasticbeanstalk:DescribeApplicationVersions",
        "elasticbeanstalk:DescribeApplications",
        "elasticbeanstalk:DescribeEnvironments",
        "elasticbeanstalk:ListAvailableSolutionStacks",
        "elasticloadbalancing:DescribeListeners",
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeTargetGroups",
        "elasticloadbalancing:DescribeTargetHealth",
        "elasticfilesystem:DescribeFileSystems",
        "elasticmapreduce:List*",
        "elastictranscoder:List*",
        "es:DescribeElasticsearchDomain",
        "es:DescribeElasticsearchDomains",
        "es:ListDomainNames",
        "events:ListRuleNamesByTarget",
        "events:ListRules",
        "events:ListTargetsByRule",
        "firehose:List*",
        "firehose:DescribeDeliveryStream",
        "gamelift:List*",
        "glacier:List*",
        "iam:List*",
        "iam:GetAccountSummary",
        "iam:GetLoginProfile",
        "importexport:ListJobs",
        "inspector:List*",
        "iot:List*",
        "kinesis:ListStreams",
        "kinesisanalytics:ListApplications",
        "kms:ListKeys",
        "lambda:List*",
        "lex:GetBotAliases",
        "lex:GetBotChannelAssociations",
        "lex:GetBots",
        "lex:GetBotVersions",
        "lex:GetIntents",
        "lex:GetIntentVersions",
        "lex:GetSlotTypes",
        "lex:GetSlotTypeVersions",
        "lex:GetUtterancesView",
        "lightsail:GetBlueprints",
        "lightsail:GetBundles",
        "lightsail:GetInstances",
        "lightsail:GetInstanceSnapshots",
        "lightsail:GetKeyPair",
        "lightsail:GetRegions",
        "lightsail:GetStaticIps",
        "lightsail:IsVpcPeered",
        "logs:Describe*",
        "machinelearning:Describe*",
        "mobilehub:ListAvailableFeatures",
        "mobilehub:ListAvailableRegions",
        "mobilehub:ListProjects",
        "opsworks:Describe*",
        "opsworks-cm:Describe*",
        "organizations:List*",
        "mobiletargeting:GetApplicationSettings",
        "mobiletargeting:GetCampaigns",
        "mobiletargeting:GetImportJobs",
        "mobiletargeting:GetSegments",
        "polly:Describe*",
        "polly:List*",
        "rds:Describe*",
        "redshift:DescribeClusters",
        "redshift:DescribeEvents",
        "redshift:ViewQueriesInConsole",
        "route53:List*",
        "route53:Get*",
        "route53domains:List*",
        "s3:ListAllMyBuckets",
        "s3:ListBucket",
        "sagemaker:Describe*",
        "sagemaker:List*",
        "sdb:List*",
        "servicecatalog:List*",
        "ses:List*",
        "shield:List*",
        "states:ListActivities",
        "states:ListStateMachines",
        "sns:List*",
        "sqs:ListQueues",
        "ssm:ListAssociations",
        "ssm:ListDocuments",
        "storagegateway:ListGateways",
        "storagegateway:ListLocalDisks",
        "storagegateway:ListVolumeRecoveryPoints",
        "storagegateway:ListVolumes",
        "swf:List*",
        "trustedadvisor:Describe*",
        "waf:List*",
        "waf-regional:List*",
        "workdocs:DescribeAvailableDirectories",
        "workdocs:DescribeInstances",
        "workmail:Describe*",
        "workspaces:Describe*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
*/
```

### Get a version comparison of versions '5' and '17' policy document for policy 'ViewOnlyAccess'
```javascript
console.log(getPolicyDiffByVersions('ViewOnlyAccess', 5, 17));
/*
{
  "added": {
    "Statement": {
      "0": {
        "Action": {
          "179": "mediaconnect:ListReservations",
          "180": "mobiletargeting:GetApplicationSettings",
          "181": "mobiletargeting:GetCampaigns",
          "182": "mobiletargeting:GetImportJobs",
          "183": "mobiletargeting:GetSegments",
          "184": "opsworks-cm:Describe*",
          "185": "opsworks:Describe*",
          "186": "organizations:List*",
          "187": "outposts:GetOutpost",
          "188": "outposts:GetOutpostInstanceTypes",
          "189": "outposts:ListOutposts",
          "190": "outposts:ListSites",
          "191": "outposts:ListTagsForResource",
          "192": "polly:Describe*",
          "193": "polly:List*",
          "194": "rds:Describe*",
          "195": "redshift:DescribeClusters",
          "196": "redshift:DescribeEvents",
          "197": "redshift:ViewQueriesInConsole",
          "198": "resource-explorer-2:GetDefaultView",
          "199": "resource-explorer-2:GetIndex",
          "200": "resource-explorer-2:ListIndexes",
          "201": "resource-explorer-2:ListSupportedResourceTypes",
          "202": "resource-explorer-2:ListTagsForResource",
          "203": "resource-explorer-2:ListViews",
          "204": "route53:Get*",
          "205": "route53:List*",
          "206": "route53domains:List*",
          "207": "route53resolver:Get*",
          "208": "route53resolver:List*",
          "209": "s3:ListAllMyBuckets",
          "210": "s3:ListBucket",
          "211": "sagemaker:Describe*",
          "212": "sagemaker:List*",
          "213": "sdb:List*",
          "214": "servicecatalog:List*",
          "215": "ses:List*",
          "216": "shield:List*",
          "217": "sns:List*",
          "218": "sqs:ListQueues",
          "219": "ssm:ListAssociations",
          "220": "ssm:ListDocuments",
          "221": "states:ListActivities",
          "222": "states:ListStateMachines",
          "223": "storagegateway:ListGateways",
          "224": "storagegateway:ListLocalDisks",
          "225": "storagegateway:ListVolumeRecoveryPoints",
          "226": "storagegateway:ListVolumes",
          "227": "swf:List*",
          "228": "trustedadvisor:Describe*",
          "229": "waf-regional:List*",
          "230": "waf:List*",
          "231": "wafv2:List*",
          "232": "workdocs:DescribeAvailableDirectories",
          "233": "workdocs:DescribeInstances",
          "234": "workmail:Describe*",
          "235": "workspaces:Describe*"
        }
      }
    }
  },
  "deleted": {},
  "updated": {
    "Statement": {
      "0": {
        "Action": {
          "2": "autoscaling:Describe*",
          "3": "aws-marketplace:ViewSubscriptions",
          "9": "cloudformation:DescribeStacks",
          "10": "cloudformation:List*",
          "13": "cloudhsm:ListHapgs",
          "14": "cloudhsm:ListHsms",
          "15": "cloudhsm:ListLunaClients",
          "16": "cloudsearch:DescribeDomains",
          "17": "cloudsearch:List*",
          "20": "cloudwatch:Get*",
          "21": "cloudwatch:List*",
          "25": "codedeploy:Get*",
          "26": "codedeploy:List*",
          "29": "cognito-identity:ListIdentities",
          "30": "cognito-identity:ListIdentityPools",
          "31": "cognito-idp:List*",
          "32": "cognito-sync:ListDatasets",
          "33": "config:Describe*",
          "34": "config:List*",
          "35": "connect:List*",
          "36": "comprehend:Describe*",
          "37": "comprehend:List*",
          "40": "datapipeline:ListPipelines",
          "41": "dax:DescribeClusters",
          "42": "dax:DescribeDefaultParameters",
          "43": "dax:DescribeEvents",
          "44": "dax:DescribeParameterGroups",
          "45": "dax:DescribeParameters",
          "46": "dax:DescribeSubnetGroups",
          "47": "dax:ListTags",
          "48": "devicefarm:List*",
          "49": "directconnect:Describe*",
          "50": "discovery:List*",
          "51": "dms:List*",
          "52": "ds:DescribeDirectories",
          "53": "dynamodb:DescribeBackup",
          "54": "dynamodb:DescribeContinuousBackups",
          "55": "dynamodb:DescribeGlobalTable",
          "56": "dynamodb:DescribeGlobalTableSettings",
          "57": "dynamodb:DescribeLimits",
          "58": "dynamodb:DescribeReservedCapacity",
          "59": "dynamodb:DescribeReservedCapacityOfferings",
          "60": "dynamodb:DescribeStream",
          "61": "dynamodb:DescribeTable",
          "62": "dynamodb:DescribeTimeToLive",
          "63": "dynamodb:ListBackups",
          "64": "dynamodb:ListGlobalTables",
          "65": "dynamodb:ListStreams",
          "66": "dynamodb:ListTables",
          "67": "dynamodb:ListTagsOfResource",
          "68": "ec2:DescribeAccountAttributes",
          "69": "ec2:DescribeAddresses",
          "70": "ec2:DescribeAvailabilityZones",
          "71": "ec2:DescribeBundleTasks",
          "72": "ec2:DescribeCarrierGateways",
          "73": "ec2:DescribeClassicLinkInstances",
          "74": "ec2:DescribeConversionTasks",
          "75": "ec2:DescribeCustomerGateways",
          "76": "ec2:DescribeDhcpOptions",
          "77": "ec2:DescribeExportTasks",
          "78": "ec2:DescribeFlowLogs",
          "79": "ec2:DescribeHost*",
          "80": "ec2:DescribeIdFormat",
          "81": "ec2:DescribeIdentityIdFormat",
          "82": "ec2:DescribeImage*",
          "83": "ec2:DescribeImport*",
          "84": "ec2:DescribeInstance*",
          "85": "ec2:DescribeInternetGateways",
          "86": "ec2:DescribeKeyPairs",
          "87": "ec2:DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociations",
          "88": "ec2:DescribeLocalGatewayRouteTableVpcAssociations",
          "89": "ec2:DescribeLocalGatewayRouteTables",
          "90": "ec2:DescribeLocalGatewayVirtualInterfaceGroups",
          "91": "ec2:DescribeLocalGatewayVirtualInterfaces",
          "92": "ec2:DescribeLocalGateways",
          "93": "ec2:DescribeMovingAddresses",
          "94": "ec2:DescribeNatGateways",
          "95": "ec2:DescribeNetwork*",
          "96": "ec2:DescribePlacementGroups",
          "97": "ec2:DescribePrefixLists",
          "98": "ec2:DescribeRegions",
          "99": "ec2:DescribeReserved*",
          "100": "ec2:DescribeRouteTables",
          "101": "ec2:DescribeSecurityGroupRules",
          "102": "ec2:DescribeSecurityGroups",
          "103": "ec2:DescribeSnapshot*",
          "104": "ec2:DescribeSpot*",
          "105": "ec2:DescribeSubnets",
          "106": "ec2:DescribeTags",
          "107": "ec2:DescribeVolume*",
          "108": "ec2:DescribeVpc*",
          "109": "ec2:DescribeVpnGateways",
          "110": "ec2:SearchLocalGatewayRoutes",
          "111": "ecr:DescribeRepositories",
          "112": "ecr:ListImages",
          "113": "ecs:Describe*",
          "114": "ecs:List*",
          "115": "elastic-inference:DescribeAccelerators",
          "116": "elastic-inference:DescribeAcceleratorTypes",
          "117": "elastic-inference:DescribeAcceleratorOfferings",
          "118": "elastic-inference:ListTagsForResource",
          "119": "elasticache:Describe*",
          "120": "elasticbeanstalk:DescribeApplicationVersions",
          "121": "elasticbeanstalk:DescribeApplications",
          "122": "elasticbeanstalk:DescribeEnvironments",
          "123": "elasticbeanstalk:ListAvailableSolutionStacks",
          "124": "elasticfilesystem:DescribeFileSystems",
          "125": "elasticloadbalancing:DescribeInstanceHealth",
          "126": "elasticloadbalancing:DescribeListeners",
          "127": "elasticloadbalancing:DescribeLoadBalancers",
          "128": "elasticloadbalancing:DescribeTargetGroups",
          "129": "elasticloadbalancing:DescribeTargetHealth",
          "130": "elasticmapreduce:List*",
          "131": "elastictranscoder:List*",
          "132": "es:DescribeElasticsearchDomain",
          "133": "es:DescribeElasticsearchDomains",
          "134": "es:ListDomainNames",
          "135": "events:ListRuleNamesByTarget",
          "136": "events:ListRules",
          "137": "events:ListTargetsByRule",
          "138": "firehose:DescribeDeliveryStream",
          "139": "firehose:List*",
          "140": "fsx:DescribeFileSystems",
          "141": "gamelift:List*",
          "142": "glacier:List*",
          "143": "greengrass:List*",
          "144": "iam:GetAccountSummary",
          "145": "iam:GetLoginProfile",
          "146": "iam:List*",
          "147": "importexport:ListJobs",
          "148": "inspector:List*",
          "149": "iot:List*",
          "150": "kinesis:ListStreams",
          "151": "kinesisanalytics:ListApplications",
          "152": "kms:ListKeys",
          "153": "lambda:List*",
          "154": "lex:GetBotAliases",
          "155": "lex:GetBotChannelAssociations",
          "156": "lex:GetBotVersions",
          "157": "lex:GetBots",
          "158": "lex:GetIntentVersions",
          "159": "lex:GetIntents",
          "160": "lex:GetSlotTypeVersions",
          "161": "lex:GetSlotTypes",
          "162": "lex:GetUtterancesView",
          "163": "lightsail:GetBlueprints",
          "164": "lightsail:GetBundles",
          "165": "lightsail:GetInstanceSnapshots",
          "166": "lightsail:GetInstances",
          "167": "lightsail:GetKeyPair",
          "168": "lightsail:GetRegions",
          "169": "lightsail:GetStaticIps",
          "170": "lightsail:IsVpcPeered",
          "171": "logs:Describe*",
          "172": "lookoutvision:ListModelPackagingJobs",
          "173": "lookoutvision:ListModels",
          "174": "lookoutvision:ListProjects",
          "175": "machinelearning:Describe*",
          "176": "mediaconnect:ListEntitlements",
          "177": "mediaconnect:ListFlows",
          "178": "mediaconnect:ListOfferings"
        }
      }
    }
  }
}
*/
```