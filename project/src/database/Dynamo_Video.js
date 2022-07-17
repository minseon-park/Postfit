const AWS = require("aws-sdk");

let awsConfig = {
  "region": "us-west-1",
  "accessKeyId": "AKIA2E5WBUKWQF3EMBWL",
  "secretAccessKey": "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"
}

AWS.config.update(awsConfig)
const dynamo = new AWS.DynamoDB.DocumentClient();

async function getDynamoData(id, category){
  let params = {
    TableName: "videos",
    Key: {
      video_id: id,
      category: category
    }
  }

  return dynamo.get(params).promise();
}

const dynamo1 = new AWS.DynamoDB.DocumentClient();
function updateDynamo(inputVal, signedInUserName, signedInUserImageKey, videoID, videoCategory){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
  
    var params = {
      TableName:"videos",
      Key:{
        video_id: videoID,
        category: videoCategory
      },
      "UpdateExpression" : "SET #attrName = list_append(#attrName, :attrValue)",
      "ExpressionAttributeNames" : {
        "#attrName" : "user_comments"
      },
      "ExpressionAttributeValues" : {
        ":attrValue" : [{
              "date" : today,
              "message" : inputVal,
              "username" : signedInUserName,
              "imageurl" : signedInUserImageKey
        }
        ]
      },
      ReturnValues:"UPDATED_NEW"
  };
  
  console.log("Updating the item...");
  dynamo1.update(params, function(err, data) {
      if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      }
  });
  }

const dynamo2 = new AWS.DynamoDB.DocumentClient();
function updatePlaylist(signedInUserEmail, videoID, videoCategory){
  
    var params = {
      TableName:"posfit_users",
      Key:{
        email_id: signedInUserEmail
      },
      "UpdateExpression" : "SET #attrName = list_append(#attrName, :attrValue)",
      "ExpressionAttributeNames" : {
        "#attrName" : "playlist"
      },
      "ExpressionAttributeValues" : {
        ":attrValue" : [{
              "video_id": videoID,
              "category": videoCategory
        }
        ]
      },
      ReturnValues:"UPDATED_NEW"
  };
  
  console.log("Updating the item...");
  dynamo2.update(params, function(err, data) {
      if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      }
  });
  }

const dynamo3 = new AWS.DynamoDB.DocumentClient();
async function getDynamoUser(email){
    let params = {
      TableName: "posfit_users",
      Key: {
        email_id: "cordisjason@gmail.com"
      }
    }
  
    return dynamo.get(params).promise();
  }

const dynamo4 = new AWS.DynamoDB.DocumentClient();
async function scanTable(){
  let params = {
    TableName: "videos",
  }
  return dynamo4.scan(params).promise();
}

const dynamo5 = new AWS.DynamoDB.DocumentClient();
async function dynamoScan(category){ 
  var cat = category; 
  var params = {
    TableName: "videos",
    ProjectionExpression: "category, video_id, video_title",
    FilterExpression: "category = :category",
    ExpressionAttributeValues: {
         ":category": "Misc"

     
    }
};

console.log("Scanning table.");
dynamo5.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the results
        console.log("Scan succeeded.");
        data.Items.forEach(function(item) {
           console.log(
                item.category + ": thumbnail id:",
                item.thumbnail_id, "- title:", item.video_title);
        });

        // continue scanning if we have more, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            dynamo5.scan(params, onScan);
        }
    }
}
}
export {dynamo, getDynamoData};
export {dynamo1, updateDynamo};
export {dynamo2, updatePlaylist};
export {dynamo3, getDynamoUser};
export {dynamo4, scanTable};
export {dynamo5, dynamoScan};
