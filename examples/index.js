const { getPolicyCount, listPolicies, getPolicyByName, getLatestPolicyDocument, getPolicyDocumentByVersion, getPolicyDiffByVersions } = require('../dist/index');

console.log(`Number of Managed Policies: ${getPolicyCount()}`);

console.log(`Get first 10 policy names:`);
console.log(JSON.stringify(listPolicies().filter((p, i) => i <= 9), null, 2));

console.log(`Get policy by name: 'AdministratorAccess'`);
console.log(JSON.stringify(getPolicyByName('AdministratorAccess'), null, 2));

console.log(`Get latest policy document for policy: 'AdministratorAccess'`);
console.log(JSON.stringify(getLatestPolicyDocument('AdministratorAccess'), null, 2));

console.log(`Get version '5' policy document for policy: 'ViewOnlyAccess'`);
console.log(JSON.stringify(getPolicyDocumentByVersion('ViewOnlyAccess', 5), null, 2));

console.log(`Get a version comparison of versions '5' and '17' policy document for policy: 'ViewOnlyAccess'`);
console.log(JSON.stringify(getPolicyDiffByVersions('ViewOnlyAccess', 5, 17), null, 2));
