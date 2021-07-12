import * as cdk from "@aws-cdk/core";
import * as amplify from "@aws-cdk/aws-amplify";

export class AmplifyInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, "amplify-demo-app", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "scalasm",
        repository: "amplify-cdk-demo",
        oauthToken: cdk.SecretValue.secretsManager("github-token")
      })
    });
    
    amplifyApp.addBranch("main");
  }
}
