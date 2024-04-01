import { useState } from "react";
import { projectFirestore } from '../firebase/config';
import { collection, query, where, onSnapshot, limit } from "firebase/firestore";
import { usePlacesContext } from "./usePlacesContext";

export const usePlaces = () => {
  const [error, setError] = useState(null)
  const { places_mde, dispatch } = usePlacesContext()
  let placesRef = collection(projectFirestore, "places");
  let results = []
  let lastPlaces = []
  let randomPlaces = []
  let queryFlag = 0
  let newPlaces = []

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const cleanResults = () => {
    // Cleaning results of repeated places.
    let uniqueResults = []
    newPlaces.forEach((item)=>{
      if(!uniqueResults.includes(item)) {
        uniqueResults.push(item);
      }
    })
    newPlaces = []
    newPlaces.push(uniqueResults)
  }

  const getResultsFromContext = (activity, zone, plan, name) => {
    let flagPlaces = false
    let allPlaces = []
    allPlaces.push(...places_mde)
    
    if (name) {
      if (flagPlaces) {
        allPlaces = []
        allPlaces = newPlaces
        newPlaces = []
        newPlaces.push(...allPlaces.filter(place => place['desc'].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                          .includes(name.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
        newPlaces.push(...allPlaces.filter(place => place['name'].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        .includes(name.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
      }
      else {
        newPlaces.push(...places_mde.filter(place => place['desc'].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                          .includes(name.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
        newPlaces.push(...places_mde.filter(place => place['name'].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        .includes(name.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
        flagPlaces = true
      }

    }
    if (activity) {
      if (flagPlaces) {
        allPlaces = []
        allPlaces = newPlaces
        newPlaces = []
        newPlaces.push(...allPlaces.filter(place => place['activity'] === activity))
      }
      else {
        newPlaces.push(...places_mde.filter(place => place['activity'] === activity))
        flagPlaces = true
      }
    }
    if (zone) {
      if (flagPlaces) {
        allPlaces = []
        allPlaces = newPlaces
        newPlaces = []
        newPlaces.push(...allPlaces.filter(place => place['zone'] === zone))
      }
      else {
        newPlaces.push(...places_mde.filter(place => place['zone'] === zone))
        flagPlaces = true
      }
    }
    if (plan) {
      if (flagPlaces) {
        allPlaces = []
        allPlaces = newPlaces
        newPlaces = []
        newPlaces.push(...allPlaces.filter(place => place['plan'] === plan))
      }
      else {
        newPlaces.push(...places_mde.filter(place => place['plan'] === plan))
        flagPlaces = true
      }
    }

    cleanResults()

    if (newPlaces.length) {
      results = []
      results.push(...newPlaces[0])
    }
    else {
      results = []
      results.push(...places_mde)
    }
  }


  const search = async (activity, zone, plan, name='') => {
    setError(null)
    try {
      if (places_mde) {
        queryFlag = 1
        getResultsFromContext(activity, zone, plan, name)
      }
      else {
        console.log("Q!")
        // By doing firestore queries
        if (activity) {
          placesRef = query(placesRef, where("activity", "==", activity))
        }
        if (zone) {
          placesRef = query(placesRef, where("zone", "==", zone))
        }
        if (plan) {
          placesRef = query(placesRef, where("plan", "==", plan))
        }
        if (name) {
          let names = []
          names.push(name)
          names.push(name.toLowerCase())
          let words = name.split(" ");
          words = words.map((word) => { 
              return word[0].toUpperCase() + word.substring(1); 
          }).join(" ");
          names.push(words)
          placesRef = query(placesRef, where('name', 'in', names))
        }
      }
        
      if (queryFlag === 0) {
        await onSnapshot(placesRef, (snapshot) => {
          snapshot.docs.forEach(doc => {
              results.push({...doc.data(), id: doc.id})
          })
        })
        await delay(1500);
      }

      setError(null)

      return results
    }
    catch(err) {
        setError(err.message)
        return null
    }
  }

  const lastRecords = async (number = null) => {
    setError(null)
    try {
        if (places_mde) {
          for (const place of places_mde) {
            lastPlaces.push({...place, did:place['did']})
          }
        }
        else {
          console.log('Q.')
          placesRef = query(placesRef)
          await onSnapshot(placesRef, (snapshot) => {
              snapshot.docs.forEach(doc => {
                lastPlaces.push({...doc.data(), did: doc.id})
              })
          })
          await delay(2000)
          dispatch({type: 'ALL', payload: lastPlaces})
        }
        setError(null)
    }
    catch(err) {
        setError(err.message)
    }
  }

  const randomPlan = async () => {
    setError(null)
    try {
        // Note: Lenght of the database places collection + 1
        let randomId = Math.floor(Math.random() * 101);
        if (places_mde) {
          randomPlaces.push({...places_mde[randomId], id: places_mde[randomId]['did']})
        }
        else {
          console.log('Query random')
          placesRef = query(placesRef, where("id", '==', randomId))
          await onSnapshot(placesRef, (snapshot) => {
              snapshot.docs.forEach(doc => {
                randomPlaces.push({...doc.data(), id: doc.id})
              })
          })
          await delay(1500);
        }
        setError(null)
    }
    catch(err) {
        setError(err.message)
    }
  }

  return { search, lastRecords, randomPlan, lastPlaces, randomPlaces, error }
}

