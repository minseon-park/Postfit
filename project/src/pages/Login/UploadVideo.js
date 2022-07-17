import { useState, useContext } from "react";
import { VideoContext } from "../../database/Video_S3andDynamo";
import '../../css/UploadVidForm.css';
import { useHistory } from "react-router-dom";

function UploadVideo(props) {
    const [videoTitle, setVideoTitle] = useState("");
    const [videoDesc, setVideoDesc] = useState("");
    const [category, setCategory] = useState("none");
    const [video, setVideo] = useState(undefined);
    const [thumbnail, setThumbnail] = useState(undefined);
    const [msg, setMsg] = useState("");

    const { uploadVideo } = useContext(VideoContext);

    const history = useHistory();

    function onSubmit(data) {
        data.preventDefault()

        setMsg("Uploading video, please wait...");

        uploadVideo(
            props.username,
            props.email,
            {
                video: video,
                thumbnail: thumbnail,
                description: videoDesc,
                title: videoTitle,
                category: category
            })
            .then((success) => {
                if (success) {
                    setVideoTitle("");
                    setVideoDesc("");
                    setCategory("none");
                    setVideo(undefined);
                    setThumbnail(undefined);
                    setMsg("Successfully uploaded");
                    console.log("Successful upload");
                }
                console.log(success);
            })
            .catch(err => {
                console.error("error in uploadVideo()", err);
            });
        history.push("/users/:email");
    }

    return (
        <div className="upload-video">
            <div className="upload-container">
            <h1>Video Upload</h1>
                <form className="upload-video-form" onSubmit={onSubmit}>
                    <div className="vid-title">
                        <label>Video Title</label>
                        <input
                            className="upload-input-box"
                            required
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                        />
                    </div>

                    <div className="video-description">
                        <label>Video Description</label>
                        <textarea
                            className="upload-text-area"
                            required
                            maxLength="200"
                            value={videoDesc}
                            onChange={(e) => setVideoDesc(e.target.value)}
                        />
                    </div>
                    
                    <div className="video">
                        <label>Upload Video</label>
                        <input
                            required
                            type="file"
                            onChange={(e) => setVideo(e.target.files[0])}
                            accept={"video/mp4"}
                        />
                    </div> 

                    <div className="video-thumbnail">
                        <label>Choose Thumbnail</label>
                        <input
                            required
                            type="file"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                            accept={"image/jpeg"}
                            placeholder="Browse Image"
                        />
                    </div>

                    <div className="video-category">
                        <label>Choose Category:</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value="Yoga">Yoga</option>
                            <option value="Weight Lifting">Weight Lifting</option>
                            <option value="Pilates">Pilates</option>
                            <option value="Boxing">Boxing</option>
                            <option value="Dancing">Dancing</option>
                            <option value="Aerobics">Aerobics</option>
                            <option value="Anaerobics">Anaerobics</option>
                            <option value="Golf">Golf</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Football">Football</option>
                            <option value="Soccer">Soccer</option>
                            <option value="Misc">Misc</option>
                            <option value="none">none</option>
                        </select>
                    </div>

                    <button className="video-button" type="submit">Submit</button>

                    <p>{msg}</p>
                </form>
            </div>
        </div>
    );
}

export default UploadVideo;
