import '../css/PlayVideo.css'
import Webcam from 'react-webcam';
import { useRef } from "react";
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

import videos from '../videos/yoga.mp4';
import drawJoints from '../ai/draw'; 

// var frameRate = Web.MediaTrackSettings.frameRate;
// console.log(frameRate);

function PlayVideo() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Pose detection
  // -------------------------------------------------------------------------------------------------
  const tracking = async () => {
    
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    const canvas = document.getElementById('output1');
    const ctx = canvas.getContext('2d');
    setInterval (() => {     
      detecting(ctx, detector)
    }, 100)
    
  };


  const detecting = async (ctx, detector) => {
    const videoData = document.getElementById("videoDataRef");
    const video = document.getElementById("video");
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
      
      //console.log(poses)
      
      drawJoints(poses[0].keypoints, ctx, "#FF0000")
    }

    if (videoData){
      
      ctx.width = video.width;
      ctx.height = video.height;
      console.log(ctx)
      const poses = await detector.estimatePoses(videoData);
      console.log(poses[0].keypoints)
    }
  }
  tracking();

  return (
    <>
      <div style={{padding: 200}}>
        <video id="videoDataRef" controls >
          <source id="video" src = {videos} type="video/mp4"></source>
        </video>
        <canvas id="output1" ref={canvasRef} style={{ width: 500, height: 500, backgroundColor: 'rgba(52, 52, 52, 0.8)'}}/>
      </div>
    </>
  );
}

//         <Webcam ref={webcamRef} style={{ width: 640, height:480, transform: "translateX(10px) scaleX(-1)"}}/>

export default PlayVideo;