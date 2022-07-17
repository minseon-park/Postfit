import {useContext, useEffect, useState, useRef} from 'react';
import "../css/Video.css";

import { getS3url } from "../database/s3";
import { getDynamoData } from "../database/Dynamo_Video"
import { updateDynamo } from "../database/Dynamo_Video"
import { updatePlaylist } from "../database/Dynamo_Video"
import { getDynamoUser } from "../database/Dynamo_Video"
//import tracking from "../ai/tracking"
import Webcam from 'react-webcam';

import {AccountContext} from "../database/AccContext_Session";
import {useHistory} from "react-router-dom";
import {UserTableContext} from "../database/Dynamo_UserTable";

import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import drawJoints from '../ai/draw'; 

const defaultUserImage = getS3url("default-user.jpg");

function getVideoID(){
getDynamoData("0", "default").then((data) => {
  var videoID1 = window.location.href;
  console.log(videoID1);
  videoID1 = videoID1.substring(videoID1.lastIndexOf('/')+1);
  console.log(videoID1);

  document.getElementById("videoID").innerHTML = videoID1;

  var videoCategory = videoID1.substring(videoID1.lastIndexOf('_')+1);
  var videoCategory = videoCategory.replaceAll("%20", " ");
  var videoID1 = videoID1.substring(0, videoID1.lastIndexOf('_'));
  console.log(videoID1)
  console.log(videoCategory);

  setVideoInfo(videoID1, videoCategory);
  setCommentInfo(videoID1, videoCategory)

})

}

function setVideoInfo(videoID1, videoCategory){
  console.log(videoCategory)
  getDynamoData(videoID1, videoCategory).then((data) => {
    var a = data.Item.video_title;
    var b = data.Item.creator_name;
    var c = data.Item.date_of_publish;
    var d = data.Item.description;
    var e = data.Item.category;
    e = e.replaceAll("%20", " ");
    var f = data.Item.user_comments;
    var g = data.Item.creator_profile_pic;
    document.getElementById("video-title").innerHTML = a;
    document.getElementById("user-name").innerHTML = b;
    document.getElementById("video-date").innerHTML = c;
    document.getElementById("video-description").innerHTML = d;
    document.getElementById("video-category").innerHTML = "Category: " + e;

    const videoKey = videoID1;
    const url = getS3url(videoKey)
    document.getElementById("video").src = url;
    const imageurl1 = getS3url(g);

    var z = document.getElementsByClassName("user-i");
    z[0].src = imageurl1;

});
}

function setCommentInfo(videoID, category){
  getDynamoData(videoID, category).then((data) => {
    var f = data.Item.user_comments;
    var g = data.Item.user_comments.length;
    document.getElementById("comment-num1").innerHTML =  g;

    for (let i = 0; i < f.length; i++) {
      document.getElementById("user-comments").innerHTML = '<div class = "comment-block"> <div class ="comment-image"> <img class = "comment-image-' + i + '" id = "userimg" src={imageurl} alt="user image"></img> </div> <div class = "comment-text" id = "comment-text"> <div class = "comment-user" id = "comment-user-' + i + '"> </div> <div class = "comment-date" id = "comment-date-' + i + '"> </div> </div> <div class= "comment-message" id = "comment-message-' + i + '"> </div></div>' + document.getElementById("user-comments").innerHTML;
    }

    for (let i = 0; i < f.length; i++){
      const imageurl = getS3url(f[i].imageurl)
      
      document.getElementById("comment-date-"+i).innerHTML = f[i].date;
      document.getElementById("comment-message-"+i).innerHTML = f[i].message;
      document.getElementById("comment-user-"+i).innerHTML = f[i].username;
      document.getElementsByClassName("comment-image-"+i)[0].src = imageurl;

    }

  }
    )
}

var ucomm = 1;

function postComment(){

  var user_email = document.getElementById("user_email").innerHTML;

  if(user_email == 'none')
    document.getElementById("CommentButtonText").innerHTML = "You Must Log In"

  else{
    var videoID1 = document.getElementById("videoID").innerHTML;

    var videoCategory = videoID1.substring(videoID1.lastIndexOf('_')+1);
    var videoID1 = videoID1.substring(0, videoID1.lastIndexOf('_'));

    var inputVal = document.getElementById("user-comment").value;

    var user_email = document.getElementById("user_email").innerHTML;
    getDynamoUser(user_email).then((data) => {
      console.log(data.Item.user_name);
      console.log(data.Item.user_profile);

      var signedInUserName = data.Item.user_name;
      var signedInUserURL = data.Item.user_profile;

      updateDynamo(inputVal, signedInUserName, signedInUserURL, videoID1, videoCategory);

      getDynamoData(videoID1, videoCategory).then((data) => {
        document.getElementById("user-comments").innerHTML = '<div class = "comment-block"> <div class ="comment-image"> <img class = "comment-image-u-' + ucomm + '" id = "userimg" src={imageurl} alt="user image"></img> </div> <div class = "comment-text" id = "comment-text"> <div class = "comment-user" id = "comment-user-u-' + ucomm + '"> </div> <div class = "comment-date" id = "comment-date-u-' + ucomm + '"> </div> </div> <div class= "comment-message" id = "comment-message-u-' + ucomm + '"> </div></div>' + document.getElementById("user-comments").innerHTML;
    
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        
        today = mm + '/' + dd + '/' + yyyy;
    
        var inputVal = document.getElementById("user-comment").value;
        document.getElementById("comment-user-u-"+ucomm).innerHTML = signedInUserName;
        document.getElementsByClassName("comment-image-u-"+ucomm)[0].src = getS3url(signedInUserURL);
        document.getElementById("comment-message-u-"+ucomm).innerHTML = inputVal;
        document.getElementById("comment-date-u-"+ucomm).innerHTML = today;
    
        ucomm++;
    
        var num = parseInt(document.getElementById("comment-num1").innerHTML)
        num++;
        document.getElementById("comment-num1").innerHTML = num;
    
      }
        )

    }
      )
  }
}

function updatePlaylistFunction(signedInUserEmail){
  var user_email = document.getElementById("user_email").innerHTML;

  if(user_email == 'none')
    document.getElementById("add-playlist-text").innerHTML = "You Must Log In"
  else{
  var videoID1 = document.getElementById("videoID").innerHTML;
  var videoCategory = videoID1.substring(videoID1.lastIndexOf('_')+1);
  var videoID1 = videoID1.substring(0, videoID1.lastIndexOf('_'));
  console.log(user_email)
  document.getElementById("add-playlist-text").innerHTML = "Adding Video..."

  updatePlaylist(user_email, videoID1, videoCategory)
  document.getElementById("add-playlist-text").innerHTML = "Video Added!"
  }
}

function SetUserData(){
  const [username, setUserName] = useState("")
  const {getSession, logout} = useContext(AccountContext);
  const {retrieveUser, appendVideoKey, removeVideoKey} = useContext(UserTableContext)
  const history = useHistory();

  useEffect(() => {
      getSession().then( (data) => {
          console.log("Session In User: ", data);
          if(data) {
            getDynamoUser(data.email).then((data) => {
              document.getElementsByClassName("signedInUserImage")[0].src = getS3url(data.Item.user_profile);
              document.getElementById("user_email").innerHTML = data.Item.email_id;
            }
              )
          } else {
              return undefined;
          }
      })
  }, [])  
}

function Video() {  
   
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const poseModel = poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING;

  // Pose detection
  // -------------------------------------------------------------------------------------------------
  const tracking = async () => {
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');
    setInterval (() => {
      detecting(ctx, detector)
    }, 100)
  };


  const detecting = async (ctx, detector) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4){
      // get video properties
      const camVideo = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight
      
      // set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // detection
      const poses = await detector.estimatePoses(camVideo);

      // if (poses[0].keypoints != undefined) {
      //   console.log(poses[0].keypoints)
      // }
      
      //drawOnCanvas(poses[0].keypoints,ctx)
    }
  }

  function drawOnCanvas(keypoints, ctx, color) {
    drawJoints(keypoints, ctx, poseModel, color);
  }
  
  tracking();
  // -------------------------------------------------------------------------------------------------


  return (
          <>
            <div class = "video-page">
            <div class = "video-player">
                <video controls id = "video">
                <source src = "" type="video/mp4"></source>
                </video>
                <div style={{ zindex: 1, width: '30%', height: '40%', position: 'absolute', top: 0, left: '70%', textAlign: 'left' }}>
                  <Webcam ref={webcamRef} style={{ forceScreenshotSourceSize: "true", transform: "translateX(10px) scaleX(-1)"}}/>
                </div>
                <div style={{ zindex: 2, width: '30%', height: '40%', position: 'absolute', top: 0, left: '70%', textAlign: 'left', paddingLeft: 10}}>
                  <canvas id="output" ref={canvasRef} style={{ width: '70%', height: '100%', backgroundColor: 'rgba(52, 52, 52, 0.2)' }}/>
                </div>
                
            </div>
            <div class = "video-header">
                <div id = "video-title" class = "video-title">
                </div>
                <div class = "video-date" id = "video-date">
                </div>
                <div class = "video-category" id = "video-category">
                </div>
            </div>
            <div id = "line"></div>
            <div class = "video-info">
            <div class="user-image"><img class = "user-i" id = "userimg" src="" alt="user image"></img>
            </div>
                
            <div class="info-block">
                <div class = "user-name" id = "user-name"> </div>
                <div class = "video-description" id = "video-description"> </div>
                <div class = "show-more"> SHOW MORE </div>
                <button class = "add-playlist" onClick = {() => updatePlaylistFunction("cordisjason@gmail.com")}><div class = "add-playlist-text" id = "add-playlist-text"> Save to Playlist <div id = "plus-sign"> + </div> </div> </button>
            </div>
            </div>
            <div id  = "line"></div>
                <div class = "video-comments">
                    <div class = "comments-header">
                        <div class = "comment-num" id = "comment-num">Comments (</div><div class = "comment-num1" id = "comment-num1"></div><div class = "comment-num">)</div>
                        <div class = "signedInUser">
                            <img id = "userimg" class = "signedInUserImage" src = {defaultUserImage}></img>
                        </div>
                        <div class = "comment-form">
                            <form id = "submit-comment">
                                <input type="text" id="user-comment" name="user-comment" placeholder = "Add a comment..."></input>
                            </form>
                        </div>
                        <button id = "comment-button" value="COMMENT" onClick = {() => {postComment()}}><p class = "CommentButtonText" id = "CommentButtonText">COMMENT</p></button>
                    </div>
                    <div class = "user-comments" id = "user-comments">
                                    </div>
                    </div>
            <div class = "videoID" id="videoID"></div>
            <div class = "user_email" id="user_email">none</div>
            </div>
            <div class = "webcam">
              {SetUserData()};
              {getVideoID()};
            </div>
          </>
            
  );
}

export default Video;