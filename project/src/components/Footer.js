import '../css/Footer.css';
import Facebook from '../images/Footer/facebook.png';
import Insta from '../images/Footer/insta.png';
import Twitter from '../images/Footer/twitter.png';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        <div className="footer-top">
          Have a question? Contact us!
        </div>
        <div className="footer-middle">
          <div className="time">Operating hours: 9AM-5PM M-F</div>
          <div className="phone">By Phone: +1(415)-123-4567</div>
        </div>
        <div className="footer-bottom">
          <div className="email">Email: Fitness@Posfit.com</div>
        </div>
      </div>
      <div className="footer-right">
        <p> Our socials </p>
        <div className="social-images">
          <img className="social" src={Facebook} alt="none"/>
          <img className="social" src={Insta} alt="none"/>
          <img className="social" src={Twitter} alt="none"/>
        </div>
      </div>
    </div>
  );
}

export default Footer;