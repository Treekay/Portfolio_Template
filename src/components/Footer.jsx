import "./Footer.css";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import profile from "../data/profile";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* 左侧图标 */}
        <div className="footer-icon">
          <FaCode />
        </div>

        {/* Address */}
        <div className="footer-block">
          <h3>Address</h3>
          <p>{profile.city}</p>
          <p>{profile.address}</p>
        </div>

        {/* Contacts */}
        <div className="footer-block">
          <h3>Contacts</h3>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
        </div>

        {/* Links */}
        <div className="footer-block">
          <h3>Links</h3>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <FaGithub />
            </a>

            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
