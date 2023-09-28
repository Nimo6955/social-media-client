import React, { useEffect, useState } from 'react'
import './profile.scss'
import Post from '../Post/post'
import ProfilePosts from '../profilePosts/profilePosts'
// import UserImg from '../../assets/dog.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/createPost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'
// import post from '../Post/post'
import { folloAndUnfollowUser } from '../../redux/slices/feedSlice'
import { BsFillHouseFill } from 'react-icons/bs'
import {BiUserCircle} from 'react-icons/bi'
import {MdOutlineLogout} from 'react-icons/md'
import {IoReorderThree} from 'react-icons/io5'



function Profile() {

const navigate = useNavigate()
const params = useParams();
const userProfile = useSelector(state => state.postsReducer.userProfile)
const myProfile = useSelector(state => state.appConfigReduser.myProfile)
const feedData = useSelector(state => state.feedDataReducer.feedData)


const [isMyProfile, setIsMyProfile] = useState(false);
const [isfollowing, setIsfollowing] = useState();
// const [liked, setLiked] = useState();


const dispatch = useDispatch();

useEffect(() =>{
  dispatch(getUserProfile({
    userId: params.userId
  }))
  setIsMyProfile(myProfile?._id === params.userId);
  setIsfollowing(feedData?.followings?.find(item => item._id === params.userId))

},[myProfile, params.userId, feedData]);

function handleUserFollow(){
  dispatch(folloAndUnfollowUser({
    userIdToFollow: params.userId
  }))
}


  return (
    <div className='Profile'>
      <div className="sideNavbar">
      <div className='side-bar-routes'>

        <button className="home hover-link  btn-primary3" onClick={() =>navigate('/')}> <BsFillHouseFill/> home</button>

        <button className="profile hover-link  btn-primary2"> <BiUserCircle/> profile</button>
      </div>

      </div>
      <div className="container">
        <div className="left-part">
          {isMyProfile && <CreatePost/>}
        {userProfile?.posts?.map(post => <ProfilePosts  key={post?._id} post={post}/>)}
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
              {!isMyProfile && <button onClick={handleUserFollow}  className={isfollowing ? "hover-link follow-link btn-primary" : 'btn-secondary'}>{isfollowing ? 'Unfollow' : 'follow'}</button>
}
           
              {isMyProfile &&  <button className='update-profile btn-secondary hover-link' onClick={()=> {navigate('/updateProfile')}}>Update profile</button>}
           

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile