import React from "react";
import "../assets/Features.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faLocation } from '@fortawesome/free-solid-svg-icons'


export default function Features({ places }) {
  const onNameClick = (e) => {
    e.preventDefault();
  }

  return (
    <section id="features" data-stellar-background-ratio="0.5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="section-title">
              {places && places.length > 0 ?
                <><h2>Let's Visit</h2>
                <span className="line-bar">...</span></> : <h4>
                  No places to show. Please try again.
                </h4>
              }
            </div>
          </div>
          {places && places.map(place => (
            <div className="col-md-6 col-sm-6" key={place.id}>
            {/* BLOG THUMB */}
              <div className="media blog-thumb">
                <div className="media-object media-left">
                  <a href={place.mainImg} target="_blank" rel='noopener noreferrer'>
                    <img
                      src={place.mainImg}
                      className="img-responsive-place"
                      alt=""
                    />
                  </a>
                </div>
                <div className="media-body blog-info">
                  <small>
                    <FontAwesomeIcon icon={place.plan==='day' ? faSun : faMoon} /> &nbsp;
                      {place.activity.charAt(0).toUpperCase() + place.activity.slice(1)} - &nbsp;
                      {place.plan.charAt(0).toUpperCase() + place.plan.slice(1)}
                  </small>
                  <h3>
                    <a href="/" onClick={onNameClick} className="place-name">
                      {place.name}
                    </a>
                  </h3>
                  <p title={place.desc} className="place-desc">
                    {place.desc.length <= 150 ? place.desc : place.desc.slice(0, 150) + "..." }
                  </p>
                  <a href={place.location} target="_blank" rel='noopener noreferrer'>
                  <FontAwesomeIcon icon={faLocation} /> Location on Google.
                  </a>
                  {/* <Link target="_blank" to={`/places/${place.id}`} className="btn section-btn">
                     Details
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
