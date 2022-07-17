import React, {createContext, useState} from "react";
import {CognitoUser, AuthenticationDetails, CognitoUserSession,} from "amazon-cognito-identity-js";
import Pool from "./Cognito";
import {useHistory} from "react-router-dom";

// In order to grab sessions or to take any information from Cognito we need to make a context.
// that is accessible through all components. So we can track User throughout our site and control their
// traffic.
const AccountContext = createContext();

const Account = (props) => {

    const history = useHistory(); // necessary for user routing.
    //used to keep track in global components ie) NavBar
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    // grabs the current user session who logged into our app via login page.
    // call this to get access to their user information; ie) email.. etc.
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                // use of cognito's getSession from API CognitoUser
                user.getSession(async (err, session) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    const results = {};

                                    for (let attribute of attributes) {
                                        const { Name, Value } = attribute;
                                        results[Name] = Value;
                                    }
                                    resolve(results);
                                }
                            });
                        }).then(results => {
                            resolve({ user, ...session, ...results });
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                });
            } else {
                console.log("User doesn't exist in current pool, must log in...");
            }
        }).catch(err => {
            console.error("error in 'getSession()'\n", err);
        });
    };

    // call this when you are trying to authenticate a user. give it the password an email.
    // If successful the username and password entered will generate back the CognitoUser object
    // allowing you to further grant user access to AWS (API) services. ie) deleting one's account.
    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });

            const authDetails = new AuthenticationDetails({
                Username: Username,
                Password: Password
           });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess: ", data);
                    setIsLoggedOut(false);
                    setIsAuthenticated(true);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data);
                    resolve(data);
                },
            });
        })
    };

    // helper, signs a user out and takes them back to '/', primarily used for logout and delete account.
    // Takes a CognitoUser object as an argument
    const signUserOut = (user) => {
        console.log(user.getUsername() + " logging out");
        user.signOut();
        setIsLoggedOut(true);
        setIsAuthenticated(false);
        history.push("/");
    }

    // as the function name explains... deletes the user.
    const deleteUser = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            console.log("in Delete", user);

            // first authenticates the user. If so they'll be granted "access" via a token to use the rest of the API.
            authenticate(Username, Password).then((data) => {
                if(data instanceof CognitoUserSession) {
                    user.setSignInUserSession(data);
                } else {
                    console.error("data not type Cognito Session\n", data);
                }
            }).then(() =>  {
                // on success of authentication, user now deletes THEIR OWN ACCOUNT.
                user.deleteUser((err, data) => {
                    if(err) {
                        console.error("failure in deleteUser", err);
                        reject(err)
                    } else {
                        console.log("success in deleteUser", data);
                        signUserOut(user);
                        resolve(data)
                    }
                })
            });
        }).catch((err) => {
            console.error("error in 'deleteUser()'\n", err);
        })
    }

    // self explanatory.
    const logout = () => {
        // grab user.
        const user = Pool.getCurrentUser();
        // if user exists, log them out.
        if (user) {
            signUserOut(user);
        }
    };

    // allows us to access these following methods and attributes all across our web app, ie The components we define
    // so long as we make those components children of this component. ie)
    /*
    <this component>
        <Our-Other-Pages />
    </this component>
     */
    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout, deleteUser, isLoggedOut, isAuthenticated}}>
            {props.children}
        </AccountContext.Provider>
    );
};
export { Account, AccountContext };