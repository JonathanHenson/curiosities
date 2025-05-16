# Cognitive Load Study - CDK Deployment

This directory contains an AWS CDK (Cloud Development Kit) project for deploying the Cognitive Load Study web application to AWS. The deployment creates an S3 bucket to host the application and a CloudFront distribution to serve it securely.

## Prerequisites

- Node.js (version 14.x or later)
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed (`npm install -g aws-cdk`)
- CDK bootstrapped in your AWS account (`cdk bootstrap`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

## Deployment Steps

1. First, build the React application from the parent directory:
```bash
cd ..
npm run build
```

2. Deploy the application to AWS:
```bash
cd cdk
npm run deploy
```

This will:
- Create an S3 bucket to host the web application
- Upload the built React application to the S3 bucket
- Create a CloudFront distribution to serve the website securely
- Set up proper error handling for single-page application routing

## Output

After successful deployment, the CDK will output:
- The CloudFront domain URL where the application is accessible
- The name of the S3 bucket where the application is stored

## Cleaning Up

To delete all resources created by this CDK stack:
```bash
npm run destroy
```

## Customization

To modify the deployment (e.g., add a custom domain name or change the region):
1. Edit the `app.ts` file to update your stack configuration
2. Run `npm run build` to compile the changes
3. Deploy with `npm run deploy`

## Structure

- `bin/app.ts` - Main CDK application entry point
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `cdk.json` - CDK configuration