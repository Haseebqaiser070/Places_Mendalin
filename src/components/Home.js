import React, { useEffect } from "react";
import "../assets/Home.css";
import Select from 'react-select'
import { useState } from "react";
import { usePlaces } from '../hooks/usePlaces';
import Features from './Features';

export default function Home() {
  
  const activityOptions = [
    { value: '', label: 'All activities' },
    { value: 'familiar', label: 'Familiar' },
    { value: 'tourist', label: 'Tourist' },
    { value: 'social', label: 'Social' },
    { value: 'romantic', label: 'Romantic' }
  ]  
  const zoneOptions = [
    { value: '', label: 'All zones' },
    { value: 'south', label: 'South' },
    { value: 'north', label: 'North' },
    { value: 'west', label: 'West' },
    { value: 'east', label: 'East' }
  ]
  const planOptions = [
    { value: '', label: 'All plans' },
    { value: 'day', label: 'Day' },
    { value: 'night', label: 'Night' }
  ]

  const [places, setPlaces] = useState();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activity, setActivity] = useState(activityOptions[0]);
  const [zone, setZone] = useState(zoneOptions[0]);
  const [plan, setPlan] = useState(planOptions[0]);
  const { search, lastRecords, randomPlan, lastPlaces, randomPlaces, error } = usePlaces();

  const searchPlaces = (e) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      Promise.all([search(activity.value, zone.value, plan.value, name)]).then((values) => {
        setPlaces(values[0]);
      });
      document.getElementById("features").scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsLoading(false)
    }
    catch(err) {
      console.log(error, err.message);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      await lastRecords() // It is getting all the places
      if(lastPlaces.length === 0) {
        console.log("Searching again")
        fetchData()
      }
      else {
        setPlaces(lastPlaces)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])


  const getRandomPlan = async (e) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      await randomPlan()
      setPlaces(randomPlaces)
      document.getElementById("features").scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsLoading(false)
    }
    catch(err) {
      console.log(error, err.message);
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Searcher */}
      <section id="home" data-stellar-background-ratio="0.5">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="home-info">
                <h1>Discover more than 100 places in Medellín!</h1>
                <span className="span-home">Use the filters so you can get the best matches for the 
                  type of places you're looking for. Good luck &#128522; </span>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
                <form onSubmit={searchPlaces} className="form-filters">
                  <input 
                    type="text" 
                    className="search-bar"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Type a key word"
                    maxLength="50"/>
                  <Select 
                    options={activityOptions}
                    defaultValue={activityOptions[0]}
                    onChange={(newValue) => {
                      setActivity(newValue);
                    }}
                    className="select-actity"
                  />
                  <Select 
                    options={zoneOptions}
                    defaultValue={zoneOptions[0]}
                    onChange={(newValue) => setZone(newValue)}
                    className="select-zone"
                  />
                  <Select 
                    options={planOptions}
                    defaultValue={planOptions[0]}
                    onChange={(newValue) => setPlan(newValue)}
                    className="select-plan"
                  />
                  <input type="submit" className="form-filters-btn" name="submit" value={isLoading ? 'Loading...' : '🔍  Search'} /> 
                  {isLoading && <span className="loading-spinner"></span>}
                </form>
            </div>
            <div className="col-md-12 col-sm-12">
              <button className="random-btn" onClick={getRandomPlan}>🎲 Discover a Random Place</button>
            </div>
          </div>
        </div>
      </section>

      {/* Places */}
      <Features places={places}/>
    </>
  );
}
