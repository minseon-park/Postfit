import "../../css/Deletion.css"
import { useContext, useState } from "react";
import { AccountContext } from "../../database/AccContext_Session";
import { UserTableContext } from "../../database/Dynamo_UserTable";

function Deletion() {
    /**
     * This component represents the account-deletion-page from settings, where a user can terminate their account.
     * Current implementation is simple, it just deletes their email account in Cognito,
     * TODO: Upon deleting account;
     *  - Delete any other traces of the account in Dynamo once implemented.
     */
    let [password, setPassword] = useState("");
    const { getSession, deleteUser } = useContext(AccountContext);
    const { deleteUserEntries } = useContext(UserTableContext);
    // on submit, the user's session is captured to access email and password is obtained by form.
    // then user's account is deleted in Cognito which should push them to '/'
    // NOTE; because we're grabbing the session rather than obtaining email from a field
    //  user cannot delete another user by simply knowing another accounts email and password.
    function handleSubmit(e) {
        e.preventDefault()

        getSession().then((value) => {

            console.log("here on deletion.", value.email);
            deleteUserEntries(value.email);
            deleteUser(value.email, password)
                .then((data) => {
                    console.log("account deleted", data);
                })
            return value.email
        })


    }

    return (
        <div className="account-deletion">
            <div className="acc-box">
                <h1>ACCOUNT DELETION</h1>
                <form className="delete-acc-form" onSubmit={handleSubmit}>
                   
                    <br/>
                    <label>Password:</label>
                    <input
                        className="delete-input"
                        type={"password"}
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <button name="delete-acc-button">Delete Account</button>
                </form>
            </div>
        </div>
    )
}

export default Deletion;