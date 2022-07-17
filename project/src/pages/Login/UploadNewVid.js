import React, {useContext, useEffect, useState} from 'react';
import {AccountContext} from "../../database/AccContext_Session";
import {useHistory} from "react-router-dom";
import {UserTableContext} from "../../database/Dynamo_UserTable";
import UploadVideo from "./UploadVideo";
import '../../css/UploadPage.css';

function UploadNewVid() {

    const [email, setEmail] = useState("")
    const [username, setUserName] = useState("");
    const [status, setStatus] = useState(false);

    const {getSession} = useContext(AccountContext);
    const {retrieveUser} = useContext(UserTableContext)
    const history = useHistory();

    useEffect( () => {
        getSession().then( (data) => {
            console.log("Session In User: ", data);
            if(data) {
                setStatus(true)
                setEmail(data.email)
                return data.email
            } else {
                console.error("Error in upload-video-page:\n", data);
                return undefined;
            }
        }).then(email => {
            retrieveUser(email).then(result => {
                const data = result.Item
                setUserName(data.user_name);
            })
        })
    }, [])


    function renderUploadPage() {
        return(
            <>
                <UploadVideo username={username} email={email}/>
            </>
        );
    }

    return (
        <div className="upload-container">
            {status ? renderUploadPage(): "Please login"}
        </div>
    );
}

export default UploadNewVid;