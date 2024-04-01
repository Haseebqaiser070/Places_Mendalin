import { createContext, useReducer } from 'react'

export const PlacesContext = createContext()

export const placesReducer = (state, action) => {
  switch (action.type) { 
    case 'ALL':
      return { ...state, places_mde: action.payload }
    default:
      return state
  }
}

export const PlacesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(placesReducer, { 
    places_mde: null 
  })
  
  return (
    <PlacesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </PlacesContext.Provider>
  )

}