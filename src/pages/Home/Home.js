import React, { useEffect } from 'react'
import './Home.scss'
import Navbar from '../../components/Navbar/navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMyInfo } from '../../redux/slices/appConfigSlice'

function Home() {

  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(getMyInfo())
  }, [dispatch])
  
  
  return (
    <>
   <Navbar/>
   {/* <div style={{marginTop: '60px'}} className='outlet'> */}
   <Outlet/>

   {/* </div> */}
    </>
  )
}

export default Home