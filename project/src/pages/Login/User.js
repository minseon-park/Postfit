import "../../css/User.css"
import React, {useContext, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {AccountContext} from "../../database/AccContext_Session";
import {useHistory} from "react-router-dom";
import {UserTableContext} from "../../database/Dynamo_UserTable";
import { getDynamoUser } from "../../database/Dynamo_Video"
import { getS3url } from "../../database/s3";


import UploadVideo from "./UploadVideo";
import Playlist from "./Playlist";

function User() {
    /**
     * This component displays the user-page, should show the user's;
     * username, bio, playlist, etc.
     */
    const [status, setStatus] = useState(false);
    const [email, setEmail] = useState("")
    const [username, setUserName] = useState("");
    const [userType, setUserType] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicId, setProfilePicId] = useState("");
    const [video_id, setVideoId] = useState(null);
    const [playlist_id, setPlaylistId] = useState(null);

    const {getSession, logout} = useContext(AccountContext);
    const {retrieveUser, appendVideoKey, removeVideoKey} = useContext(UserTableContext)
    const history = useHistory();

    // grabs the user session once, and uploads the user page with user's information.
    useEffect( () => {
        getSession().then( (data) => {
            console.log("Session In User: ", data);
            if(data) {
                setStatus(true)
                setEmail(data.email)
                return data.email
            } else {
                console.error("Error in user-page:\n", data);
                return undefined;
            }
        }).then(email => {
            retrieveUser(email).then(result => {
                const data = result.Item
                /**
                 * TODO: fill in user-page with user info
                 *      data = {
                 *          email_id: string, contains the user's email
                 *          user_type: string, identifies the user as a trainer or trainee
                 *          user_name: string, contains the user's username
                 *          bio : string, contains the user's biography
                 *          user_profile : contains the user's profile_pic_id that's stored in s3,
                 *          playlist: Array[] : list of video_id's stored in s3
                 *          video_id: Array[] : list of video_id's that the user uploaded stored in s3.
                 *      }
                 */
                setUserType(data.user_type);
                setUserName(data.user_name);
                setBio(data.bio);
                setProfilePicId(getS3url(data.user_profile));
                setVideoId(data.video_id);
                setPlaylistId(data.playlist);
            })
        })
    }, [])

    // functions to handle changing pages
    function handleChangePass(e) {
        e.preventDefault();
        history.push("/change_password");
    }

    function handleUpload(e){
        e.preventDefault();
        history.push("/upload_video");
    }

    function getPlaylist() {
        var f = playlist_id
        console.log(f.length)
        for (let i = 0; i < f.length; i++) {
            document.getElementById("playlist").innerHTML = '<div class = "video-item"> <div class ="video-image"> <img class = "video-image-' + i + '" id = "userimg" src={imageurl} alt="user image"></img> </div> <div class = "video-title" id = "video-title">' + document.getElementById("playlist").innerHTML;
        }

        for (let i = 0; i < f.length; i++) {
            /*
          const imageurl = getS3url(f[i].imageurl)

          document.getElementById("comment-date-"+i).innerHTML = f[i].date;
          document.getElementById("comment-message-"+i).innerHTML = f[i].message;
          document.getElementById("comment-user-"+i).innerHTML = f[i].username;
          document.getElementsByClassName("comment-image-"+i)[0].src = imageurl;
          */

        }
    }
    // console.log(getS3url(profilePicId));
    console.log(profilePicId);
    function renderUserPage() {
        return (
            <div className="userpage-container">
                {/* <img src={getS3url(profilePicId)}></img> */}
                <div className="user-profile-bar">
                    <img className="user-profile-pic" src={profilePicId} alt="profilePic"/>
                    <div className="user-profile-type">
                        <span>{userType}</span>
                    </div>
                    <div className="user-profile-content">
                        <div style={{ width: '50%'}}>NAME</div>
                        <div>{username}</div>
                    </div>
                    <div className="user-profile-content">
                        <div style={{ width: '50%'}}>EMAIL</div>
                        <div>{email}</div>
                    </div>
                    <div className="user-profile-bio">
                        <div style={{ width: '50%', fontSize: '1.25rem', fontWeight: '700'}}>BIO</div>
                        <div style={{ width: '100%', wordWrap: 'break-word', fontSize: '1rem'}}>{bio}</div>
                    </div>
                    <div className="setting-buttons">
                        <Link className="edit-profile" to={`/edit_profile/${email}`}>EDIT PROFILE</Link>
                        <button className="reset-password" onClick={handleChangePass} >RESET PASSWORD</button>
                    </div>
                </div>
                <div className="video-playlist-bar">
                    <Link to={`/playlist/${email}`} id="playlist-link" className="playlist-link"> Your uploaded videos </Link>
                    <div style={{  width: '100%', borderBottom: '1px solid black', marginTop: '2rem'}} />
                    <div className="video-playlist-content"></div>
                    <div style={{  width: '100%', borderBottom: '1px solid black', marginTop: '2rem'}} />
                    <div className="video-playlist-bt">
                        <button onClick={handleUpload} className="video-playlist-button">UPLOAD NEW VIDEO</button>
                    </div>
                </div>
                
            </div>
        );
    }

    return (
        <div className="user-page">
            {status ? renderUserPage(): "please login"}
        </div>
    );
}

export default User;
