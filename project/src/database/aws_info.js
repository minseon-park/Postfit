AWS_ID="AKIA2E5WBUKWQ4JHDGWN"
AWS_SECRET="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"
AWS_BUCKET_NAME="netfitness-videos"

//import dotenv from 'dotenv';
//import { useEffect } from "react";
//import AWS from 'aws-sdk';
//import axios from 'axios';
/*
const AWS = require("aws-sdk");

let awsConfig = {
  "region": "us-west-1",
  "endpoint": "http://dynamodb.us-west-1.amazonaws.com",
  "accessKeyId": "AKIA2E5WBUKWQF3EMBWL",
  "secretAccessKey": "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"
}

AWS.config.update(awsConfig)
const dynamo = new AWS.DynamoDB.DocumentClient();
function fetchData() {
  let params = {
    TableName: "user",
    Key: {
      user_id: 0,
      user_type: "user"
    }
  }

  dynamo.get(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  })
}


let putData = function() {
  let params = {
    TableName: "example",
    Item: {
      id: 5,
      name: "test5",
      info: "hey hey"
    }
  }

  dynamo.put(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  })
}


//putData();

export default fetchData;



// dotenv.config();

// function awsDynamo() {
//   const [videos, setVideos] = useState([]);
//   useEffect(() => {
//     fetch('url')
//     .then(res => {
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       setBlogs(data);
//     });
//   }, []);

//   return (

//     <div className="videoContent">
//       {videos}
//     </div>
//   );
// }


// const region = "us-west-1";
// const bucketName = "netfitness-videos";
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// const s3 = new aws.S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
//   signatureVersion: '4'
// })

// export async function generateUploadURL () {
//   const imageName = "an image name"

//   const params = ({
//     Bucket: bucketName,
//     Key: imageName,
//     Expires: 60
//   })

//   const uploadURL = await s3.getSignedUrlPromise('putObject', params);
//   return uploadURL;
// }
*/

