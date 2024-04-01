import React from "react";
import "../assets/SubscribeModal.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { projectFirestore } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore";

export default function SubscribeModal({ handleSubscribeModalClose }) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const preventDefault = (e, action) => {
    e.preventDefault();

    // Closing Log In Modal
    if (action === "1") {
      handleSubscribeModalClose();
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

  const subscribeEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const placeRef = doc(projectFirestore, "subscribers", email);
      const docSnap = await getDoc(placeRef);
      if(docSnap.exists()) {
        setEmail('')
        setIsLoading(false)
        setEmailExists(true)
      }
      else {
        projectFirestore.collection('subscribers').doc(email).set({ email })
        setEmailExists(false)
        setSubscribed(true)
        setEmail('')
        setIsLoading(false)
      }
    } catch(err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={() => handleSubscribeModalClose()}>
      {!showSignUpModal && !showForgotPassword && (
        <div className="modal-login" onClick={e => e.stopPropagation()}>
          <h2>Subscribe for free!</h2>
          <div className="modal-close">
            <a href="/" onClick={(e) => preventDefault(e, "1")}>
              &times;
            </a>
          </div>
          <div className="modal-form">
            <form className="login-form" onSubmit={subscribeEmail}>
              <div className="form-container">
                <div className="form-group">
                  <input
                    type="text"
                    id="email"
                    required
                    className="form-input"
                    placeholder=" "
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <label htmlFor="email" className="form-label">
                    <FontAwesomeIcon icon={faUser} /> &#8192;Email
                  </label>
                </div>
                <input type="submit" className="form-submit" 
                  value={(isLoading) ? 'Loading...' : 'Send'} 
                  disabled={isLoading} />
              </div>
            </form>
          </div>
          <div className="modal-extras">
            {!subscribed && <span>
              You can subscribe to be up to date with the last places and suggestions in Medellin that we have for you.
            </span>}
            {subscribed && <span className="subscribed">
              You are subscribed now! 
            </span>}
            {emailExists && <span className="email-exists">
              This email was already registered. 
            </span>}
            <br />
          </div>
        </div>
      )}
    </div>
  );
}
