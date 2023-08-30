import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../Utils/localStoregeManager'
import { Navigate, Outlet } from 'react-router-dom'

function requireUser() {

    const user = getItem(KEY_ACCESS_TOKEN)
  return (
    user ? <Outlet/> : <Navigate to='/login' />
  )
}

export default requireUser