import { useState, useRef } from "react";
import { projectFirestore } from '../firebase/config';
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const useSearch = (activity) => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [places, setPlaces] = useState(null)

  const q = useRef(['activity', '==', activity]).current

  const search = async () => {
    setError(null)
    setIsLoading(true)
    try {
        let placesRef = collection(projectFirestore, "places");

        if (q) {
            placesRef = query(placesRef, where(...q))
        }
    
        const unsub = onSnapshot(placesRef, (snapshot) => {
            console.log('hello im unsub')
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            setPlaces(results)
        })

        unsub()

        console.log(places)

        setError(null)
        setIsLoading(false)
    }
    catch(err) {
        setError(err.message)
        setIsLoading(false)
    }
  }

  return { search, places, error, isLoading }

/*   const q = useRef(['activity', '==', activity]).current
  

  useEffect(() => {
    let placesRef = collection(projectFirestore, "places");

    if (q) {
        placesRef = query(placesRef, where(...q))
    }

    const unsub = onSnapshot(placesRef, (snapshot) => {
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({...doc.data(), id: doc.id})
        })
        setPlaces(results)
    })

    return () => unsub()
  }, [q, activity])

  console.log(places)
  
  return { places } */
}

