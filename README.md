# Lambda Web Adapter　using SAM CLI & AWS CDK Example

## Introduction
**this is a simple example of deploying a Docker image using Lambda Web Adapter**
**Contains examples of cdk and sam deployment.**

## Overview

> [!NOTE]
>
> Example of deploying a Docker image using Lambda Web Adapter

Due to various issues (probably my environment) I decided to use SAM instead of CDK.

Personally, I prefer CDK, but...

> ![IMPORTANT]
> Do not endorse driving the entire web application with Lambda. For SPA apps like this example, 
> there are other relatively easy methods, such as static hosting on S3.

Apple slicon CPU Arct cdk deploy failed

> ![WARNING]
> For Apple Silicon architectures, CDK deployment fails in the local environment. My error was that I couldn't push the image to ECR, 
> but I found that it works fine when pushing from Github Actions.
> See is .github/workflows directory

## SAM CLI Version
### Directory Structure
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

### Commands
- `sam deploy --guided` - Deploys the Lambda function (**If samconfig.toml exists, the `--guided` option is not required.**) 
- `sam delete` - Deletes the Lambda function
- Other commands are check the [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
---

## CDK Version




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
