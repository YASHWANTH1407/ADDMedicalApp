import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <section id="Footer">
    <div className="footer-section">
      <div className="footer-container">
        <div className="ft-info">
          <div className="ft-info-p1">
            <p className="ft-title">
             Chikitsa <span className="ft-sign"></span>
            </p>
            <p className="ft-description">
            Chikitsa: Where Compassion Meets Convenience in Online Healthcare
            </p>
          </div>
        </div>   <div className="ft-list" id="contact">
          <p className="ft-list-title">Talk To Us</p>
          <ul className="ft-list-items">
            <li>
              <a href="mailto:support@Chikitsa.com">support@chikitsa.com</a>
            </li>

            <li>
              <a href="tel:+022 5454 5252">+91 63017 00819</a>
            </li>
            <li>
              <a href="tel:+022 2326 6232">+91 93980 41001</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-copyright">
        &copy; 2023 Chikitsa. All rights reserved.
      </div>
    </div>
    </section>
  );
}

export default Footer;