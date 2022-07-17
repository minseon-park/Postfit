import dynamo from "./AWS";
import {s3, getS3url} from "../database/s3";
import {createContext} from "react";
const UserTableContext = createContext();

function UserTable(props) {

    const TABLE_NAME = "posfit_users";

    //email, username, accountType, bio, profilePic
    async function insertUser (email, username, type, bio, profilePic) {
        return await new Promise((resolve, reject) => {
            console.log(email + "_profile_pic.jpg");
            const params = {
                TableName: TABLE_NAME,
                Item: {
                    email_id: email,
                    user_type: type,
                    user_name: username,
                    user_profile: email + "_profile_pic.jpg",
                    bio: bio,
                    playlist: [],
                    video_id: []
                }
            };

            // logs user into dynamo db, their username, email, bio, profile_pic key, upload and playlist video_ids
            dynamo.put(params, (err) => {
                if(err) {
                    console.error("Failure in: insertUser\n", err);
                    reject(undefined);
                } else {

                    const params_pfp = {
                        Body: profilePic,
                        Bucket: "posfit-bucket",
                        Key: email + "_profile_pic.jpg",
                    };

                    // upload their profile_pic onto s3
                    s3.putObject(params_pfp, (err) => {
                        if (err) {
                            console.error(err, "could not put profile pic onto s3");
                        } else {
                            console.log("pfp upload success.");
                        }
                    });

                    resolve()
                }
            });

        })
    }

    async function deleteUserEntries(email) {

        return await new Promise((resolve, reject) => {

            const params = {
                TableName: TABLE_NAME,
                Key: {
                    email_id: email,
                }
            }

            dynamo.delete(params, (err) => {
                if(err) {
                    console.error("Failure in: deleteUserEntries\n", err);
                    reject(err);
                } else {
                    resolve(email);
                }
            })

            const params_pfp = {
                Bucket: "posfit-bucket",
                Key: email + "_profile_pic.jpg",
            };

            // upload their profile_pic onto s3
            s3.deleteObject(params_pfp, (err) => {
                if (err) {
                    console.error(err, "could not put profile pic onto s3");
                    reject(err)
                } else {
                    console.log("pfp upload success.");
                }
            });



        })

    }

    async function retrieveUser(email) {

        return await  new Promise((resolve, reject) => {
            const params = {
                TableName: TABLE_NAME,
                Key: {
                    email_id: email,
                }
            }

            dynamo.get(params, (err, data) => {
                if(err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            })

        })
    }

    // Helper for appendVideo and removeVideo
    function updateTable(resolve, reject , result, isPlaylist) {

        const params = {
            TableName: TABLE_NAME,
            Item: {
                email_id: result.Item.email_id,
                user_type: result.Item.user_type,
                playlist: result.Item.playlist,
                bio: result.Item.bio,
                profilePic_id: result.Item.profilePic_id,
                user_name: result.Item.user_name,
                user_profile: result.Item.user_profile,
                video_id: result.Item.video_id
            }
        };

        dynamo.put(params, (err) => {
            if(err) {
                console.error("Failure in updateTable:\n", err);
                reject(err);
            } else {
                isPlaylist ? resolve(result.Item.playlist) : resolve(result.Item.video_id);
            }
        });
    }

    async function appendVideoKey(email, video_key, isPlaylist) {

        return await new Promise((resolve, reject) => {

            retrieveUser(email).then((result) => {

                if(isPlaylist) {
                    result.Item.playlist.push(video_key);
                } else {
                    result.Item.video_id.push(video_key);
                }
                return result;

            }).then((result) => {
                updateTable(resolve, reject, result, isPlaylist);
            })

        })
    }

    async function removeVideoKey(email, video_key, isPlaylist) {

        return await new Promise((resolve, reject) => {

            retrieveUser(email).then((result) => {
                if(isPlaylist) {
                    let index = result.Item.playlist.indexOf(video_key);
                    result.Item.playlist.splice(index, 1);
                } else {
                    let index = result.Item.video_id.indexOf(video_key);
                    result.Item.video_id.splice(index, 1);
                }
                return result;
            }).then((result) => {
                updateTable(resolve, reject, result, isPlaylist);
            })
        })
    }


    return (
        <UserTableContext.Provider
            value={{insertUser, deleteUserEntries, retrieveUser, appendVideoKey, removeVideoKey}}>
            {props.children}
        </UserTableContext.Provider>
        )
}

export {UserTable, UserTableContext};