import React from 'react'
import './navbar.scss'
import Avatar from '../Avatar/avatar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'




function Navbar() {

  const navigate = useNavigate()
  const myProfile = useSelector(state => state.appConfigReduser.myProfile)


  return (
    <div className='Navbar'>
        <div className='container1'>
           <Link style={{textDecoration:'none', color:'black'}} to='/'> <h2 className="banner">Social Media</h2></Link>

            <div className="right-side">
              
                <div className="profile" onClick={() =>navigate(`/profile/${myProfile?._id}`)}>
                    <Avatar src={myProfile?.avatar?.url}/>
                </div>
                
              
            </div>
        </div>
    </div>
  )
}

export default Navbar