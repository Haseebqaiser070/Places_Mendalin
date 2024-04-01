import React, { useEffect, useState } from 'react'
import Footer from '../Footer';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { projectFirestore } from '../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Places() {
  const [ place, setPlace ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const { id } = useParams();
  const whatsappLink = `whatsapp://send?text=Hey! Check this place in Medellin: https://placesmedellin.com/places/${id}`
  
  useEffect(() => {
    try {
        setIsLoading(true);
        async function fetchData() {
            const placeRef = doc(projectFirestore, "places", id);
            let placeSnap = await getDoc(placeRef);
            if (placeSnap.exists()) {
                setPlace(placeSnap.data())
            }
            setIsLoading(false);
        }
        fetchData();
    }
    catch(err) {
        setError(err.message)
        setIsLoading(false);
    }
  }, [id])
  
  return (
    <div>
        {!isLoading && (
            <>
            <Navbar/>
                <section id="blog-header" data-stellar-background-ratio="0.5">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-offset-1 col-md-5 col-sm-12">
                                    <h2>{place ? place.name.charAt(0).toUpperCase() + place.name.slice(1) : 'There was not place found.'}</h2>
                                    {place && (
                                    <div>
                                        {place.plan.charAt(0).toUpperCase() + place.plan.slice(1)} Plan &nbsp;
                                        <FontAwesomeIcon icon={place.plan==='day' ? faSun : faMoon} /> 
                                    </div>)}
                                </div>
                            </div>
                        </div>
                </section>
                <section id="blog-detail" data-stellar-background-ratio="0.5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-offset-1 col-md-10 col-sm-12">
                                    <div className="blog-detail-thumb">
                                            { error ? <h2>{error}</h2> : <h2>Some basic information. </h2> }
                                            { place && (<p>{place.desc}</p>)}
                                            <blockquote>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, quisquam, aut, eum, natus excepturi impedit ipsa rerum ratione id dolores ducimus minus eos veniam similique.</blockquote>
                                            <ul>
                                                { place && (<li>Zone: {place.zone}.</li>)}
                                                { place && (<li>Main activity: {place.activity}.</li>)}
                                                <li>Plan</li>
                                            </ul>
                                            <div className="blog-social-share">
                                                <h4>Share this place</h4>
                                                <a href={whatsappLink} data-action="share/whatsapp/share" rel='noopener noreferrer'
                                                target="_blank" className="btn btn-success"><i className="fa fa-whatsapp"></i>Whatsapp</a>
                                            </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                </section>
            <Footer/>
            </>
        )}
    </div>
  )
}
