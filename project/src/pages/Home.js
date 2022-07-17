import CategorySlider from "../components/CategorySlider";
import ai from "../images/Home/ai.png";
import "../css/Home.css";

function Home() {

  return (
      <div>
        <div className="home-image">
          <div className="opening-statement-home">
            WORKOUT WITH <br></br>
            YOUR VIRTUAL FITNESS INSTRUCTOR
          </div>
        </div>

        <div className="home-middle">
          <div className="middle-left">
            <div className="middle-header">
              AI-Enabled Home Gym
            </div>
            <div className="middle-para">
              PosFit is an AI based web application for home gym exercisers. 
              Analyze an exerciser’s body joints and provide real-time feedback.
            </div>
          </div>
          <img className="middle-right" src={ai} />
        </div>

        <div className="home-bottom">
          <div className="break-div">
            We offer exercises in many different categories to fit your needs
          </div>
          <CategorySlider />
        </div>
      </div>
  );
}

export default Home;