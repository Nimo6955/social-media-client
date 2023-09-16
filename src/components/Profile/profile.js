import React, { useEffect, useState } from 'react'
import './profile.scss'
import Post from '../Post/post'
import UserImg from '../../assets/dog.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/createPost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'


function Profile() {

const navigate = useNavigate()
const params = useParams();
const userProfile = useSelector(state => state.postsReducer.userProfile)
const myProfile = useSelector(state => state.appConfigReduser.myProfile)

const [isMyProfile, setIsMyProfile] = useState(false)

const dispatch = useDispatch();

useEffect(() =>{
  dispatch(getUserProfile({
    userId: params.userId
  }))
  setIsMyProfile(myProfile?._id === params.userId)
},[myProfile]);


  return (
    <div className='Profile'>
      <div className="container">
        <div className="left-part">
          <CreatePost/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
        <div className="right-part">
          <div className="profile-card">
            <div className='user-img-name'>
            <img src={userProfile?.avatar?.url} alt="" className="user-img" />
            <h3 className="user-name">{userProfile?.name}</h3>

            </div>
            <div className="follower-info">
              <div className="followers">
                <h4>{userProfile?.followers?.length}</h4>
              <h4>follower</h4>
              
              </div>
              <div className="following">
                <h4>{userProfile?.followings?.length}</h4>
              <h4>following</h4>
              
              </div>

            </div>
            <div className='profile-buttons'>
              {!isMyProfile &&  <button className='follow btn-primary'>follow</button>}
           
              {isMyProfile &&  <button className='update-profile btn-secondary hover-link' onClick={()=> {navigate('/updateProfile')}}>Update profile</button>}
           

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile