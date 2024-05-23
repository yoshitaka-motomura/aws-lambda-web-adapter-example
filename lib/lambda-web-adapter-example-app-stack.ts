import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as ecr from "aws-cdk-lib/aws-ecr-assets";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";

//import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
//import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
export class LambdaWebAdapterExampleAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.DockerImageFunction(
      this,
      "NginxContainerFunction",
      {
        code: lambda.DockerImageCode.fromImageAsset("./", {
          platform: ecr.Platform.LINUX_AMD64,
          exclude: ["node_modules", "cdk.out", ".aws-sam", "test"],
        }),
        memorySize: 512,
        timeout: cdk.Duration.seconds(30),
        functionName: "OrionLambdaFunction",
      }
    );

    // rest API
    const restApi = new apigateway.LambdaRestApi(this, "NginxRestAPI", {
      handler: handler,
      binaryMediaTypes: ["*/*"],
      restApiName: "OrionWebAdapterAPI",
    });

    const certificateArn = process.env.CERTIFICATE_ARN;
    if (!certificateArn) {
      throw new Error("Certificate ARN is required");
    }
    //acm
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      "Certificate",
      certificateArn
    );

    // domain name
    const apigwDomain = new apigateway.DomainName(this, "DomainName", {
      domainName: "orion.cristallum.io",
      certificate: certificate,
      endpointType: apigateway.EndpointType.REGIONAL,
    });

    apigwDomain.addBasePathMapping(restApi);

    // route53
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "cristallum.io",
    });

    new route53.ARecord(this, "AliasRecord", {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.ApiGatewayDomain(apigwDomain)
      ),
      recordName: "orion.cristallum.io",
    });
  }
}
