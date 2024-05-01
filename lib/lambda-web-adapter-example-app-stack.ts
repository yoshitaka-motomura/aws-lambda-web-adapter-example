import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as ecr from "aws-cdk-lib/aws-ecr-assets";
import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
export class LambdaWebAdapterExampleAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.DockerImageFunction(this, "NginxImageHandler", {
      code: lambda.DockerImageCode.fromImageAsset("./", {
        platform: ecr.Platform.LINUX_AMD64,
        exclude: ["node_modules", "cdk.out", ".aws-sam", "test"],
      }),
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
    });

    // ref httpAPi
    const httpApi = new HttpApi(this, "NginxHttpAPI", {
      defaultIntegration: new HttpLambdaIntegration(
        "LambdaIntegration",
        handler
      ),
    });

    new cdk.CfnOutput(this, "NginxHttpAPI_URL", {
      value: httpApi.url!,
    });
  }
}
