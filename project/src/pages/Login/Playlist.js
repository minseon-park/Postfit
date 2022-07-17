import React, {useContext, useEffect, useState} from 'react';
import {VideoContext} from "../../database/Video_S3andDynamo";
import { Link } from "react-router-dom";
import {AccountContext} from "../../database/AccContext_Session";
import {useHistory} from "react-router-dom";
import {UserTableContext} from "../../database/Dynamo_UserTable";
import { getDynamoUser } from "../../database/Dynamo_Video"
import { getS3url } from "../../database/s3";
import { getDynamoData } from "../../database/Dynamo_Video"
import "../../css/Playlist.css"

const url = getS3url("tennis.mp4")


function getPlaylist(){
    console.log('test');
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
                document.getElementById("user_email").innerHTML = data.Item.email_id;
                document.getElementById("user-playlist").innerHTML = data.Item.user_name + "'s Playlist:";
                console.log(data.Item.email_id)
                var playlist = data.Item.playlist;
                console.log(playlist)
                var div = <div></div>
                for(let i = 0; i < playlist.length; i++){

                    getDynamoData(playlist[i].video_id, playlist[i].category).then((data1) => {
                            document.getElementById("playlist").innerHTML += '<a href="/video/' + data1.Item.video_id + '_' + data1.Item.category + '"> ' +  "<h1> " + data1.Item.video_title + "</h1>" +  "<img class = 'playlist-image' id = 'playlist-" + i + "' width='50px'></img>" + "</a>"
                            document.getElementById("playlist-"+i).src = getS3url(data1.Item.thumbnail_id)

                      })
                }
              }
                )
            } else {
                return undefined;
            }
        })
    }, [])  
  }

function Playlist() {
     /**
     * This component displays the user-page, should show the user's;
     * username, bio, playlist, etc.
     */
  
      // button takes user to the settings page.
      return (
        <>
            <h1>Welcome,</h1>
            <h1 id = "user-playlist"> </h1>
            <div class ="user-email" id = "user_email"></div>
            <div id = "playlist"></div>
            {SetUserData()}
        </>
    );
}

export default Playlist;