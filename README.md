# Lambda Web Adapter　Example using SAM CLI
This is a simple web server that can be used to run AWS Lambda functions locally. It is designed to work with the AWS SAM CLI.

## Overview

> [!NOTE]
>
> Example of deploying a Docker image using Lambda Web Adapter

Due to various issues (probably my environment) I decided to use SAM instead of CDK.

Personally, I prefer CDK, but...

> ![IMPORTANT]
> Do not endorse driving the entire web application with Lambda. For SPA apps like this example, there are other relatively easy methods, such as static hosting on S3.



## Directory Structure

```
.
├── Dockerfile
├── README.md
├── app
│   ├── README.md
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── About.tsx
│   │   │   └── Home.tsx
│   │   └── vite-env.d.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── docker-compose.yml
├── nginx
│   ├── conf.d
│   │   └── default.conf
│   └── nginx.conf
├── samconfig.toml
└── template.yml
```

- `app` - Contains the source code for the Lambda function
- `template.yaml` - Contains the SAM template for the Lambda function
- `Dockerfile` - Contains the Dockerfile for the Lambda function
- `docker-compose.yml` - Contains the Docker Compose file for the Lambda function
- `nginx` - Contains the Nginx configuration files
- `samconfig.toml` - Contains the SAM configuration for the Lambda function
---
**CDK Stack Example**
```
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Duration } from "aws-cdk-lib";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

export class ExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunc = new DockerImageFunction(this, "DockerImageFunc", {
      code: DockerImageCode.fromImageAsset("./", {
        platform: Platform.LINUX_AMD64,
        exclude: [
          "cdk.out",
          "cdk.context.json",
          "lib",
          "bin",
          "node_modeules",
          "test",
        ],
      }),
      memorySize: 512,
      timeout: Duration.seconds(30),
    });

    const lambdaIntegration = new HttpLambdaIntegration(
      "LambdaIntegration",
      lambdaFunc
    );

    const httpApi = new HttpApi(this, "HttpApi", {
      defaultIntegration: lambdaIntegration,
    });

    new cdk.CfnOutput(this, "HttpApiUrl", {
      value: httpApi.url!,
    });
  }
}

```

## Requirements
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

## References
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Docker](https://docs.docker.com/get-docker/)
- [Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter)

## Commands
- `sam local start-lambda` - Starts the Lambda web server
- `sam local invoke` - Invokes a Lambda function
- `sam build` - Builds the Lambda function
- `sam deploy --guided` - Deploys the Lambda function
