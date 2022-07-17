import {VideoContext} from "../database/Video_S3andDynamo.js";
import {useState, useContext} from "react";
import {Link} from 'react-router-dom';
import { dynamoQuery } from "../database/Dynamo_Video.js";
import { dynamoScan } from "../database/Dynamo_Video.js";

import {useHistory} from "react-router-dom";

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const SearchBar=(props)=> {
    const history = useHistory(); 
    const [searchValue, setSearchValue] = useState("");
    const [videos, setVideos] = useState([]);
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
      }
    const resetInputField = () => {
        setSearchValue("")
    }
    const callSearchFunction = (e) => {
        e.preventDefault();
        props.SearchBar(searchValue);
        resetInputField();
      }

    function onsubmit(data) {
        data.preventDefault()
        console.log(searchValue);
        const url = dynamoScan(searchValue);
        console.log(url);
        
    }

    return (
        <div className="search-bar">
            <form className="search-bar-form" onSubmit={onsubmit}>

                <label>Search for videos from DynamoScan</label>
                <input
                    required
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onChange={handleSearchInputChanges}
                    type="text"
                    
                />
                <button onClick= { () => (history.push('/search')) } type="submit">Search</button>
            </form>  

        </div>
        
    );
}

export default SearchBar;