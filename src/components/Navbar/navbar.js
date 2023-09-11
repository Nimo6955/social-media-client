import React, { useRef, useState } from 'react'
import './navbar.scss'
import Avatar from '../Avatar/avatar'
import { Link } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'


function Navbar() {

  const loadingRef = useRef()

  const [loading, setLoading] = useState()

  function toggleLoadingbar(){
    if(loading){
      setLoading(false)
      loadingRef.current.complete()
    }else{
      setLoading(true)
      loadingRef.current.continuousStart()
      
    }
  }
  return (
    <div className='Navbar'>
        <LoadingBar height={3} color='#f11946' ref={loadingRef} />
        <div className='container'>
           <Link style={{textDecoration:'none', color:'black'}} to='/'> <h2 className="banner">Social Media</h2></Link>

            <div className="right-side">
              <Link to='/Profile/dskjfs'>
                <div onClick={toggleLoadingbar} className="profile">
                    <Avatar/>
                </div>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar