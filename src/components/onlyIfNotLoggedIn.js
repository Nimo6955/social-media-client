import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../Utils/localStoregeManager'
import { Navigate, Outlet } from 'react-router-dom';

function onlyIfNotLoggedIn() {
    const user = getItem(KEY_ACCESS_TOKEN);

  return (
    
    user ? <Navigate to='/'/> : <Outlet/>
  )
}

export default onlyIfNotLoggedIn