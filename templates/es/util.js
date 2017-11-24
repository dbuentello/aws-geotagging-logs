/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

module.exports={
    "UtilLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {"Ref":"BootstrapBucket"},
          "S3Key": "lambda/cfn-s3.zip"
        },
        "Handler": "handler.handler",
        "MemorySize": "128",
        "Role": {
          "Fn::GetAtt": ["utilLambdaRole","Arn"]
        },
        "Runtime": "nodejs6.10",
        "Timeout": 60,
        "Tags":[{
            "Key":"name",
            "Value":"geotag-cfn-s3"
        }]
      }
    },
    "utilLambdaRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "Policies":[{
            "PolicyName":"Bucket",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "s3:PutBucketNotification"
                  ],
                  "Resource": [{"Fn::Join":["",[
                    "arn:aws:s3:::",
                    {"Ref": "DataBucket"}
                  ]]}]
                }
              ]
            }
        }],
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ]
      }
    }
}
 
