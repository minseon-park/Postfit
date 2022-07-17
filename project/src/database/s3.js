let AWS1 = require("aws-sdk");
let awsConfig1 = {
    "region": "us-west-1",
    "accessKeyId": "AKIA2E5WBUKWU3PY3OUY",
    "secretAccessKey": "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"
}
AWS1.config.update(awsConfig1);
const s3 = new AWS1.S3();

const myBucket = 'posfit-bucket'
const signedUrlExpireSeconds = 60 * 5

function getS3url(key){
  const url = s3.getSignedUrl('getObject', {
      Bucket: myBucket,
      Key: key,
      Expires: signedUrlExpireSeconds
  })
  return url;
}

export {s3, getS3url};


