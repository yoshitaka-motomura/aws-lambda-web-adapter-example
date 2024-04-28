# Lambda Web Adapter for SAM CLI
This is a simple web server that can be used to run AWS Lambda functions locally. It is designed to work with the AWS SAM CLI.


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

- `src` - Contains the source code for the Lambda function
- `template.yaml` - Contains the SAM template for the Lambda function
- `Dockerfile` - Contains the Dockerfile for the Lambda function
- `docker-compose.yml` - Contains the Docker Compose file for the Lambda function
- `nginx` - Contains the Nginx configuration files
- `samconfig.toml` - Contains the SAM configuration for the Lambda function


## Requirements
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)


## Commands
- `sam local start-lambda` - Starts the Lambda web server
- `sam local invoke` - Invokes a Lambda function
- `sam build` - Builds the Lambda function
- `sam deploy --guided` - Deploys the Lambda function