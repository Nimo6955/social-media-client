import React from 'react'
import './navbar.scss'
import Avatar from '../Avatar/avatar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {MdOutlineLogout} from 'react-icons/md'
import { setLoading } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../Utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../Utils/localStoregeManager'



function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myProfile = useSelector(state => state.appConfigReduser.myProfile)

  async function handleLogOut(){
    try {
      dispatch(setLoading(true))
      await axiosClient.post('auth/logout')  
      removeItem(KEY_ACCESS_TOKEN)
      navigate('/login')
      dispatch(setLoading(false))
    } catch (e) {
      
    }
  }

  return (
    <div className='Navbar'>
        <div className='container'>
           <Link style={{textDecoration:'none', color:'black'}} to='/'> <h2 className="banner">Social Media</h2></Link>

            <div className="right-side">
              
                <div className="profile" onClick={() =>navigate(`/profile/${myProfile?._id}`)}>
                    <Avatar src={myProfile?.avatar?.url}/>
                </div>
                <div className="logOut hover-link" onClick={handleLogOut}>
                  <MdOutlineLogout className='logOut-button'/>
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default Navbar