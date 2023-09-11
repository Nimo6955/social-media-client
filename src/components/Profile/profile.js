import React from 'react'
import './profile.scss'
import Post from '../Post/post'
import UserImg from '../../assets/dog.jpg'
import { useNavigate } from 'react-router-dom'



function Profile() {

const naviget = useNavigate()

  return (
    <div className='Profile'>
      <div className="container">
        <div className="left-part">
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
        <div className="right-part">
          <div className="profile-card">
            <div className='user-img-name'>
            <img src={UserImg} alt="" className="user-img" />
            <h3 className="user-name">Sukhpal Singh</h3>

            </div>
            <div className="follower-info">
              <div className="followers">
                <h4>40 </h4>
              <h4>follower</h4>
              
              </div>
              <div className="following">
                <h4>20 </h4>
              <h4>following</h4>
              
              </div>

            </div>
            <div className='profile-buttons'>
            {/* <button className='follow btn-primary'>follow</button> */}
            <button className='update-profile btn-secondary hover-link' onClick={()=> {naviget('/updateProfile')}}>Update profile</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile