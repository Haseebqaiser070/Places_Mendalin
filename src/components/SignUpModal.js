import React from "react";
import "../assets/SignUpModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function SignUpModal({ preventDefault }) {
    
  return (
    <div className="modal-signup" onClick={e => e.stopPropagation()}>
        <h2>Create Account</h2>
        <div className="modal-close">
            <a href="/" onClick={(e) => preventDefault(e, "1")}>
                &times;
            </a>
        </div>
        <div className="modal-form-signup">
            <form className="login-form">
                <div className="form-container">
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            placeholder=" "
                            required
                        />
                        <label htmlFor="username" className="form-label">
                            <FontAwesomeIcon icon={faUser} /> &#8192;Username
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="email"
                            className="form-input"
                            placeholder=" "
                            required
                        />
                        <label htmlFor="email" className="form-label">
                            <FontAwesomeIcon icon={faEnvelope} /> &#8192;Email
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder=" "
                            required
                        />
                        <label htmlFor="password" className="form-label">
                            <FontAwesomeIcon icon={faLock} /> &#8192;Password
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="confirm-password"
                            className="form-input"
                            placeholder=" "
                            required
                        />
                        <label htmlFor="confirm-password" className="form-label">
                            <FontAwesomeIcon icon={faLock} /> &#8192;Confirm password
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
                    <div className="form-checkbox">
                        <input
                            type="checkbox"
                            id="news"
                            className=""
                            placeholder=" "
                            required
                        />
                        <label htmlFor="news" className="">
                            &#8192;Accept terms and conditions.
                        </label>
                    </div>
                    <input type="submit" className="form-submit" value="Sign Up" />
                </div>
            </form>
        </div>
        <div className="modal-extras">
        <a href="/" onClick={(e) => preventDefault(e, "3")}>
            Already have an account.
        </a>
        </div>
    </div>
  );
}
