import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as ecr from "aws-cdk-lib/aws-ecr-assets";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";

export class LambdaWebAdapterExampleAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Create a new Lambda functiond
     *　Since we are using a web adapter, this is the only Lambda function we need.
     */
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

    /**
     * Create a new REST API
     * handler is the lambda function that will be called when the API is called
     */
    const restApi = new apigateway.LambdaRestApi(this, "NginxRestAPI", {
      handler: handler,
      binaryMediaTypes: ["*/*"],
      restApiName: "OrionWebAdapterAPI",
    });

    /**
     * Certificate ARN
     * envronment variable CERTIFICATE_ARN is required
     */
    const certificateArn = process.env.CERTIFICATE_ARN;
    if (!certificateArn) {
      // not exist environment variable then throw error
      throw new Error("Certificate ARN is required");
    }

    /**
     * Get certificate from ACM
     * certificateArn is the certificate ARN
     */
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      "Certificate",
      certificateArn
    );

    /**
     * apigwDomain is the domain name of the API Gateway
     */
    const apigwDomain = new apigateway.DomainName(this, "DomainName", {
      domainName: "orion.cristallum.io",
      certificate: certificate,
      endpointType: apigateway.EndpointType.REGIONAL,
    });

    // add base path mapping
    apigwDomain.addBasePathMapping(restApi);

    /**
     * hostedZone is the hosted zone of the domain
     */
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "cristallum.io",
    });

    /**
     * AliasRecord is the alias record of the domain
     * for the API Gateway domain name
     */
    new route53.ARecord(this, "AliasRecord", {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.ApiGatewayDomain(apigwDomain)
      ),
      recordName: "orion.cristallum.io",
    });
  }
}
