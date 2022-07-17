import { Link } from "react-router-dom";
import '../css/Navbar.css';
import Logo from '../images/Navbar/logo.jpeg';
import {useContext, useEffect, useState} from "react";
import {AccountContext} from "../database/AccContext_Session";

function Navbar () {

    const {getSession, isLoggedOut, isAuthenticated, logout} = useContext(AccountContext);
    const [email, setEmail] = useState("");
    const [session, setSession] = useState(null);

    useEffect(() => {

        getSession().then( (__session) => {
            console.log("Session In NavBar: ", __session);
            setEmail(__session.email);
            setSession(__session);
        })
    }, [isLoggedOut, isAuthenticated]);

    console.log(isLoggedOut, "IsLoggedOut");
    console.log(isAuthenticated, "IsAuthenticated");
    console.log(session !== null ? "session exist" : "session does not exist");

    return (
        <div className="header">
            <div className="navbar-left">
                <Link className="page-link" to="/about">About</Link>
                <Link className="page-link" to="/search">Search Video</Link>
            </div>
            <Link to="/">
                <img className="logo" src={Logo} alt="none"/>
            </Link>
            <ul className="navbar-right">
                {session && !isLoggedOut ? <Link className="page-link" to={"/users/" + email}>Profile</Link> 
                    : <Link className="page-link" to={"/login"}>Profile</Link>}
                {session && !isLoggedOut ? <Link className="page-link" to={"/"} onClick={logout}>Logout</Link>
                    : <Link className="page-link" to="/login">Login</Link>}
            </ul>
        </div>
    );
}

export default Navbar;