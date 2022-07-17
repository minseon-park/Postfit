const AWS = require("aws-sdk");

let awsConfig = {
  "region": "us-west-1",
  "accessKeyId": "AKIA2E5WBUKWQF3EMBWL",
  "secretAccessKey": "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"
}

AWS.config.update(awsConfig)
const dynamo = new AWS.DynamoDB.DocumentClient();

export default dynamo;