import React from 'react'
import { useState } from 'react'
import { useScrollPosition } from '../hooks/useScrollPosition'
import SubscribeModal from './SubscribeModal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal} from "@fortawesome/free-brands-svg-icons";
import  logoBlack  from "../img/PlacesNegro.png";

// Styles
import '../assets/Navbar.css'

function classNames(...classes) {
     return classes.filter(Boolean).join(' ');
}

export default function Navbar({ enableNavUser = false }) {
  const scrollPosition = useScrollPosition();
  const [showLogInModal, setLogInModal] = useState(false);
  const [showSubscribeModal, setSubscribeModal] = useState(false);

  const handleLogInModalClose = () => {
     setLogInModal(false);
  }

  const openLogInModal = (e) => {
     e.preventDefault()
     setLogInModal(true);
  }
  
  const openSubscribeModal = (e) => {
     e.preventDefault()
     setSubscribeModal(true);
  }

  const handleSubscribeModalClose = () => {
     setSubscribeModal(false);
  }

  return (
    <section className={classNames(
     scrollPosition > 0 ? 'top-nav-collapse' : '', 'navbar custom-navbar navbar-fixed-top'
    )} role="navigation">
          <div className="container">
               <div className="navbar-header">
                    <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                         <span className="icon icon-bar"></span>
                         <span className="icon icon-bar"></span>
                         <span className="icon icon-bar"></span>
                    </button>
                    <a href="/" className="navbar-brand">
                         <img src={logoBlack} className="navbar-logo" alt="" width="38" height="38"/>
                         Places Medellín
                    </a>
               </div>

               {!enableNavUser && 
               (<div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-nav-first">
                         <li><a href="/" className="smoothScroll">Home</a></li>
                         <li>
                              <a href="https://paypal.me/ChronCompany?country.x=CO&locale.x=es_XC" target='_blank' rel='noopener noreferrer' title="Support Places Medellin">
                                   <FontAwesomeIcon icon={faPaypal} />
                              </a>
                         </li>
                    </ul>
               </div>)}

               {enableNavUser && 
               (<div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-nav-first">
                         <li><a href="/home" className="smoothScroll">Home</a></li>
                         <li><a href="/" className="smoothScroll">Action</a></li>
                         <li><a href="/" className="smoothScroll">Get</a></li>
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                         <li className="section-btn"><a href="/" onClick={openLogInModal}>Log Out</a></li>
                    </ul>
               </div>)}
          </div>
          {showSubscribeModal && <SubscribeModal handleSubscribeModalClose={handleSubscribeModalClose}/>}
     </section>
  )
}
