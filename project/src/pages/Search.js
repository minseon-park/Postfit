import "../css/Search.css";
import React, { useReducer, useEffect } from "react";
import {Link} from 'react-router-dom';
import { getS3url } from "../database/s3";
import {UserTableContext} from "../database/Dynamo_UserTable";
import SearchResult from "../components/SearchResult";

import { dynamo4, scanTable } from "../database/Dynamo_Video"
import { dynamo, getDynamoData } from "../database/Dynamo_Video"

function getVideos(){

  scanTable().then((data) => {
    var numVideos = data.Items.length;

    const myMap = new Map();

    for(var i = 0; i < numVideos; i++){
      myMap.set(i, data.Items[i].category);
    }

    const mapSort3 = new Map([...myMap.entries()].sort());
    console.log(mapSort3);


    for (let [i, value] of mapSort3) {
        if((data.Items[i]).video_id != 0) {
        var url = getS3url(data.Items[i].thumbnail_id)
        var string = String('<a href="/video/' + data.Items[i].video_id + '_' + data.Items[i].category + '"> ' + "<img src = " + url + " width = 300px> </img> " + data.Items[i].video_title + '</a>' + '<br>')
        console.log(string);
        document.getElementById("videos").innerHTML += "<h3> Category: " + data.Items[i].category + "<h3>" + "<br />"
        document.getElementById("videos").innerHTML += string;
        }
      }
  })
}

function Search() {
    return (
      <div className="search">
          <h1>Search page</h1>
          <SearchResult />        
          <Link to={'/play_video'}>First video; Yoga Demo</Link>
          <br /> <br />

          <div id = "videos">

          </div>
          {getVideos()}
      </div>
    );
  }
  
  export default Search;