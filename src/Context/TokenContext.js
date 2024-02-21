import React, { createContext } from 'react'
import { useState } from 'react';

 export let UserToken = createContext();

export default function TokenContext(props) {
const [token , setToken] = useState(null);
  return (
    <UserToken.Provider value={{token , setToken}}>
      {props.children}
    </UserToken.Provider>
  )
}
