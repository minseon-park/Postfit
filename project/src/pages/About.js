import { useState } from 'react';
import { Link } from "react-router-dom";

import members from "../static/members";
import "../css/About.css"
import aboutImg from '../images/about/aboutpage-img.png';
import Brain from '../images/about/Brain.png';
import Darshil from '../images/about/Darshil.png';
import Minseon from '../images/about/Minseon.png';
import Jason from '../images/about/Jason.png';
import John from '../images/about/John.png';
import Vincent from '../images/about/Vincent.png';
import Zack from '../images/about/Zack.png';

function About() {

  const [member, setMember] = useState(members);

  const mem = [Brain, Zack, John, Darshil, Vincent, Minseon, Jason];

  return (
    <div className="about">
      <div className="about-1">
        <div className="about-1-content">DIG INTO YOUR PERFORMANCE</div>
      </div>
      <div className="about-2">
        <div className="about-2-content">
          <p>WORK OUT WITH VIRTUAL INSTRUCTOR</p>
          <div>
            <div>PosFit is an AI based web application that targets home gym exercisers. Due to the time and site limitations, many exercisers start looking for a home gym option.</div>
            <div>We design a product with AI enabled to automatically detect incorrect forms. Our website contains hundreds of exercises varied in different levels and categories.</div>
            <div>
              Whenexercisers follow the video, the camera captures the exercisers’ body joints and compares them to the
              instructor’s. If the positions are unmatched, the AI model highlights the joints to indicate false forms.
            </div>
          </div>
        </div>
        <img src={aboutImg} alt="aboutImg"/>
      </div>
      <div className="about-3">
        <p>Meet the Team</p>
        <div className="about-3-member">
          {member.map((person, i) => (
            <Link to={`/about/${person.id}`}>
              <button className="member" key={person.id}>
                  <img src={mem[i]} alt="member-img"/>
                  <div>
                    <div>
                      <div className={"person"}>{person.name}</div>
                      <div className="about-3-position">{person.position}</div>
                    </div>
                    <div>
                      <div className="about-3-github">GitHub: <span>{person.github}</span></div>
                      <div className="about-3-about">About: <span>{person.about}</span></div>
                    </div>
                  </div>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default About;