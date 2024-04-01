import React from "react";
import "../assets/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal} from "@fortawesome/free-brands-svg-icons";

export default function Footer({ hideFooterPanel = false }) {
  return (
    <footer data-stellar-background-ratio="0.5">
      <div className="container">
        {!hideFooterPanel && (
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="footer-bottom-nopanel">
                <div className="col-md-6 col-sm-5">
                  <div className="copyright-text">
                    <p>Places Medellín - 2022. By Chron.</p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-7">
                  <div className="phone-contact-np">
                    <p>
                      Contact us:<span>contact@chroncompany.co</span>
                    </p>
                  </div>
                  <ul className="social-icon-np">
                    <li>
                      <a href="https://paypal.me/ChronCompany?country.x=CO&locale.x=es_XC" target='_blank' rel='noopener noreferrer' title="Support Places Medellin">
                        <FontAwesomeIcon icon={faPaypal} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
