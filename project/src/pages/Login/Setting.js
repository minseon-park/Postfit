import {AccountContext} from "../../database/AccContext_Session";
import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import '../../css/Setting.css'

function Settings(props) {
    /**
     * Displays the setting page which holds buttons that lead users to a page where
     * they can configure their account.
     */
    const {getSession} = useContext(AccountContext);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    // grabs user session if the user is logged in; set to true
    getSession().then((data) => {
        if(data) {
            setLoggedIn(true)
        } else {
            console.error("Error in settings-page\n", data);
        }
    });

    /* TODO: add more configurable options for user's account */
    function handleChangePassword(e) {
        e.preventDefault();
        history.push("/change_password");
    }

    function handleDeleteAccount(e) {
        e.preventDefault()
        history.push("/delete_account");
    }

    return (
        <div className="setting">
            <div className="inner-box">
                { isLoggedIn ? <h1>SETTINGS</h1> : <p>Please Login...</p>}
                { isLoggedIn ? <div className="align-button"> <button name="change-pass" onClick={handleChangePassword}>Change Password</button></div> : <p>Please Login...</p>}
                { isLoggedIn ? <div className="align-button"> <button name="delete-acc" onClick={handleDeleteAccount}>Delete Account</button> </div> : <p>Please Login...</p>}
            </div>
        </div>
    );
}

export default Settings;