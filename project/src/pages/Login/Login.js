import {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import '../../css/Login.css';
import UserPool from "../../database/Cognito";
import loginImg from '../../images/login/login-image.jpeg';
import {AccountContext} from "../../database/AccContext_Session";

function Login() {
    /**
     * This component represents the login-page. Page notifies user if improper email and password are entered into
     * the field through a hidden div. Upon successful login, user is taken to the user-page where their info is loaded
     * on screen.
     */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const {authenticate} =  useContext(AccountContext);
    let history = useHistory();

    // We first authenticate user, once authenticated with correct email and password we send them to their user-page
    // else on improper username or password we create a message to notify the user of error.
    function handleSubmit(e) {
        e.preventDefault();

        setMsg("Verifying your account...");
        authenticate(email, password).then((data) => {
            console.log("onSuccess: ", data);
            history.push(`/users/${email}`)
        }).catch(() => {
            setMsg("Improper email or password, please try again...");
        })
    }

    return (
        <div className="login">
            <div id ="login-box">     
                <div id="login-contents">
                    <h1>LOGIN</h1>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <label>Email Address:</label>
                                <input
                                    type={"text"}
                                    required
                                    placeholder="Email..."
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                    type={"password"}
                                    required
                                    placeholder="Password..."
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </div>
                        </div>
                        <p>
                            Don't have an account?  
                            <Link to={'/register'}> Sign up today!</Link>
                        </p>
                        <section>
                            <button type={"submit"}>Login</button>
                        </section>
                    </form>
                    <p>{msg}</p>
                </div> 
                <img src={loginImg} alt='login-img'/>   
            </div>
        </div>
    );
}

export default Login;