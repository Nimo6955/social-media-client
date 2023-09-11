import React from 'react'
import './Home.scss'
import Navbar from '../../components/Navbar/navbar'
import { Outlet } from 'react-router-dom'

function Home() {

  
  return (
    <>
   <Navbar/>
   <div style={{marginTop: '60px'}} className='outlet'>
   <Outlet/>

   </div>
    </>
  )
}

export default Home