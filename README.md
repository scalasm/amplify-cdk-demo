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