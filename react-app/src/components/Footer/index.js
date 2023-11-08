import React from "react";
import "./Footer.css";
import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";

function Footer() {
  return (
    <div className="footer">
      <p className=" footer-header">
        This group project was made by the following Software Engineers:
      </p>
      <div className=" about-us">
        <div className=" user-info">
          <p>Luke Connors</p>
          <div className="icons">
            <a href="https://github.com/LukeConnors" target="_blank" rel="noreferrer">
              <BiLogoGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/luke-connors-981373b1/"
              target="_blank"
              rel="noreferrer"
            >
              <BiLogoLinkedin />
            </a>
          </div>
        </div>
        <div className=" user-info">
          <p>Tristan Allaman</p>
          <div className="icons">
            <a href="https://github.com/Tristanleif1" target="_blank" rel="noreferrer">
              <BiLogoGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/tristan-allaman-a18206232/"
              target="_blank"
              rel="noreferrer"
            >
              <BiLogoLinkedin />
            </a>
          </div>
        </div>
        <div className=" user-info">
          <p>Albert Marrero</p>
          <div className="icons">
            <a href="https://github.com/amarrero10" target="_blank" rel="noreferrer">
              <BiLogoGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/albert-marrero-dev"
              target="_blank"
              rel="noreferrer"
            >
              <BiLogoLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
