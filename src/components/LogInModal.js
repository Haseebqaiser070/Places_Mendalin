import React from "react";
import "../assets/LogInModal.css";
import SignUpModal from "./SignUpModal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faUser, faLock, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function LogInModal({ handleLogInModalClose }) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const preventDefault = (e, action) => {
    e.preventDefault();

    // Closing Log In Modal
    if (action === "1") {
      handleLogInModalClose();
    }
    // Opening Sign Up Form
    else if (action === "2") {
      setShowSignUpModal(true);
    }
    // Opening Log In Form
    else if (action === "3") {
      setShowSignUpModal(false);
    }
    // Opening Forgot Password Form
    else if (action === "4") {
      setShowForgotPassword(true);
    }
    // Close Forgot Password Form
    else if (action === "5") {
      setShowForgotPassword(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => handleLogInModalClose()}>
      {!showSignUpModal && !showForgotPassword && (
        <div className="modal-login" onClick={e => e.stopPropagation()}>
          <h2>Log In</h2>
          <div className="modal-close">
            <a href="/" onClick={(e) => preventDefault(e, "1")}>
              &times;
            </a>
          </div>
          <div className="modal-form">
            <form className="login-form">
              <div className="form-container">
                <div className="form-group">
                  <input
                    type="text"
                    id="email"
                    required
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="form-label">
                    <FontAwesomeIcon icon={faUser} /> &#8192;Email
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    required
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="password" className="form-label">
                    <FontAwesomeIcon icon={faLock} /> &#8192;Password
                  </label>
                </div>
                <div className="form-social">
                  <a href="/" className="form-facebook">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                  <a href="/" className="form-google">
                    <FontAwesomeIcon icon={faGoogle} size="2x" />
                  </a>
                </div>
                <input type="submit" className="form-submit" value="Enter" />
              </div>
            </form>
          </div>
          <div className="modal-extras">
            <a href="/" onClick={(e) => preventDefault(e, "2")}>
              Create Account.
            </a>
            <a href="/" onClick={(e) => preventDefault(e, "4")}>Forgot your password?</a>
            <br />
          </div>
        </div>
      )}
      {showSignUpModal && <SignUpModal preventDefault={preventDefault}></SignUpModal>}
      {showForgotPassword && <div className="modal-login" onClick={e => e.stopPropagation()}>
          <h2>Recover Password</h2>
          <span className="form-note">Enter the email you registered and check your inbox to continue.</span>
          <div className="modal-close">
            <a href="/" onClick={(e) => preventDefault(e, "1")}>
              &times;
            </a>
          </div>
          <div className="modal-form">
            <form className="login-form">
              <div className="form-container">
                <div className="form-group">
                  <input
                    type="text"
                    id="email"
                    required
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="form-label">
                    <FontAwesomeIcon icon={faUser} /> &#8192;Email
                  </label>
                </div>
                <input type="submit" className="form-submit" value="Get my password" />
              </div>
            </form>
          </div>
          <div className="modal-extras">
            <a href="/" onClick={(e) => preventDefault(e, "5")}>
              <FontAwesomeIcon icon={faArrowLeft} /> &#8192;Go back.
            </a>
            <br />
          </div>
      </div>}
    </div>
  );
}
