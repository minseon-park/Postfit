import { useState, useContext } from "react";
import { AccountContext } from "../../database/AccContext_Session";
import { Link } from "react-router-dom";
import '../../css/ChangePassword.css'

function ChangePassword() {
    /**
     * This component represents the change-password-page from settings. A user can change their password by
     * providing their old password and a new one following the same characteristics.
     */

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [isNewPassword, setIsNewPassword] = useState(false);
    const { getSession } = useContext(AccountContext);

    // on submit we grab the session and change their password with proper entries.
    // on success, they'll be offered a link back to their user-page
    function handleSubmit(e) {
        e.preventDefault();
        getSession().then(({ user }) => {
            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.error("Error in change-password", err);
                    setMsg("Improper password, try again...");
                } else {
                    console.log(result)
                    setEmail(user.email);
                    setIsNewPassword(true);
                }
            });
        })
    }

    if (!isNewPassword) {
        return (
            <div className="change-password">
                <div className="whole">
                    <form className="change-password-form" onSubmit={handleSubmit}>
                        <h1 className="pass-header">Change Password</h1>
                        <label>Current Password:</label>
                        <input
                            className="cur-pass-input"
                            placeholder="Current password..."
                            type={"password"}
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />

                        <label>New Password:</label>
                        <input
                            className="new-pass-input"
                            placeholder="New password..."
                            type={"password"}
                            required
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value)
                            }}
                        />
                        <div className="pass-button-div">
                            <button name="submit-pass" type="submit">Change Password</button>
                        </div>
                    </form>
                    <div className="change-password-msg">{msg}</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="password-set-successful">
                <h2>New password set successfully</h2>
                <Link to={"/users/" + email}>Go back to your personal page</Link>
            </div>
        )
    }

}

export default ChangePassword;