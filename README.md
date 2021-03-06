# Amplify-CDK Demo

This application has been written following the [YouTube tutorial from Marcia Villalba](https://www.youtube.com/watch?v=mSKQlV3lRYw&ab_channel=FooBarServerless).

# Things that I had to change

* the `amplify.yml` has to stay in the repository root, otherwise the build will succeed in Amplify but nothing will get deployed anyway.

# CLI Reminders

## Bootstrap amplify for your frontend
```
npm i @aws-amplify/ui-react aws-amplify bootstrap
```

## Environment variables for local build

Since there environment variables from Amplify are not available when building locally, then we can use this nice trick in the `package.json` run commands:
```
env-cmd -f .env.local react-scripts start
```

## Install appsync transformers

```
npm i @aws-cdk/aws-appsync cdk-appsync-transformer
```

## Generate graphql.schema for frontend

```
cd frontend/src/graphql
amplify add codegen
? Choose the type of app that you're building javascript  
? What javascript framework are you using react
? Choose the code generation language target javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions **\*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
```

# References

* [AppSync Transformer Construct for AWS CDK](https://awscdk.io/packages/cdk-appsync-transformer@1.77.16/#/) 