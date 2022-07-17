import '../../css/Registration.css'
import UserPool from "../../database/Cognito";

import {useHistory} from "react-router-dom"
import {useContext, useState} from "react";
import {UserTable, UserTableContext} from "../../database/Dynamo_UserTable";

function Registration(props) {
    /**
     * This component is the registration-page. Page is a form that takes a
     * user's email and a user created password that must be 8 characters long
     * with a single capitalized letter and at least one special character '!@#$%..'
     */

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("trainee");
    const [profilePic, setProfilePic] = useState(undefined);
    const [bio, setBio] = useState("");
    const [msg, setMsg] = useState("");

    const {insertUser} = useContext(UserTableContext);


    const history = useHistory();

    // once user submits the form we take their entries and sign them up to cognito using their signUp
    // method found in their API.
    function handleSubmit(e) {
        e.preventDefault();

        UserPool.signUp(email, password, null, [], (err, data) => {
            if (err) {
                /* TODO: - notify user if incorrect email or password.
                         - use the username field?
                 */

                console.log(err);
                setMsg(err.message)
            } else {
                // Redirects to Login-Page on successful registration
                console.log(data);

                // We now also insert user to DynamoDB generating an entry for them.
                insertUser(email, username, accountType, bio, profilePic);
                history.push('/login')
            }
        });


    }

    return (
        <div className="registration">
            <div className="reg-container">
                <form className="registration-form" onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div className="center">
                        <label>Username </label>
                        <input
                            className="input-box"
                            placeholder="   Enter your username"
                            type={"text"}
                            required
                            value={username}
                            onChange={(e) => {setUsername(e.target.value)}}
                        />

                        <label>Email </label>
                        <input
                            className="input-box"
                            placeholder="   Enter your Email"
                            type={"text"}
                            required
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <label>Password </label>
                        <input
                            className="input-box"
                            placeholder="   Enter your Password"
                            type={"password"}
                            required
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />

                        <label>Biography</label>
                        <br />
                        <textarea
                            className={"input-text-area"}
                            required
                            maxLength="200"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <br/>

                        <label>Profile Picture</label>
                        <input
                            className={""}
                            required
                            type="file"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                            accept={"image/jpeg"}
                        />

                        <label>Account Type:</label>
                        <select
                            className="acc-option"
                            value={accountType}
                            onChange={e => setAccountType(e.target.value)}
                        >
                            <option value="trainee">Trainee</option>
                            <option value="trainer">Trainer</option>
                        </select>
                        <div className="register-button-div">
                            <button className="register-button" type={"submit"}>Register</button>
                        </div>
                        <p>{msg}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration;