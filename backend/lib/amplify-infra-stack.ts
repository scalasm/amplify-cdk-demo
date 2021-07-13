import * as cdk from "@aws-cdk/core";
import * as amplify from "@aws-cdk/aws-amplify";
import * as cognito from "@aws-cdk/aws-cognito";
//import * as appsync from "@aws-cdk/aws-appsync";
//import * as appsync_transformer from "cdk-appsync-transformer";
const appsync = require("@aws-cdk/aws-appsync");
const cdk_appsync_transformer = require("cdk-appsync-transformer");

import * as path from "path";

export class AmplifyInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, " CognitoUserPool", {
      userPoolName: "AmplifyDemoUserPool",
      selfSignUpEnabled: true, // Allow users to sign up
      autoVerify: { email: true }, // Verify email addresses by sending a verification code
      signInAliases: {email: true } // Set email as alias
    });

    const userPoolClient = new cognito.UserPoolClient(this, "CognitoUserPoolClient", {
      userPool,
      generateSecret: false // No need to generate a secret for webapps running in browser
    });

    const identityPool = new cognito.CfnIdentityPool(this, "CognitoIdentityPool", {
      allowUnauthenticatedIdentities: true,
      cognitoIdentityProviders: [ {
        clientId: userPoolClient.userPoolClientId,
        providerName: userPool.userPoolProviderName
      }]
    });

    // CREAT THE APPSYNC API
    const appsyncApi = new cdk_appsync_transformer.AppSyncTransformer(this, "AmplifyDemoProjectGraphQL", {
      schemaPath: 'graphql/schema.graphql',
      authorizationConfig: {
        defaultAuthorization: {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
                userPool: userPool,
                appIdClientRegex: userPoolClient.userPoolClientId,
                defaultAction: appsync.UserPoolDefaultAction.ALLOW
            }
        }
      }
    });

    const amplifyApp = new amplify.App(this, "amplify-demo-app", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "scalasm",
        repository: "amplify-cdk-demo",
        oauthToken: cdk.SecretValue.secretsManager("github-token")
      }),
      environmentVariables: {
        "REGION": this.region,
        "IDENTITY_POOL_ID": identityPool.ref,
        "USER_POOL_CLIENT_ID": userPoolClient.userPoolClientId,
        "USER_POOL_ID": userPool.userPoolId,
        "APPSYNC_API": appsyncApi.appsyncAPI.graphqlUrl
      }
    });
    
    amplifyApp.addBranch("main");
  }
}
