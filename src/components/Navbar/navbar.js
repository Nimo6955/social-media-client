import React from 'react'
import './navbar.scss'
import Avatar from '../Avatar/avatar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SM from '../../assets/sm.jpg'




function Navbar() {
  
  const { mode } = useSelector((state) => state.darkMode)
  const navigate = useNavigate()
  const myProfile = useSelector(state => state.appConfigReduser.myProfile)


  return (
    <div className='Navbar' style={{backgroundColor: mode ? 'black' : 'white'}}>
        <div className='container1'>
        
           <Link style={{textDecoration:'none', color:'black',display:'flex', gap: '10px'}} to='/' > <img style={{backgroundColor: '#ee7837',height: '30px'}} src={SM}/> <h2 className="banner" style={{color: 'black'}}>Social Maniac</h2></Link>

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