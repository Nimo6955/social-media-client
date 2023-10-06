import React, { useEffect, useState } from 'react'
import './profile.scss'
import ProfilePosts from '../profilePosts/profilePosts'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/createPost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'
import { folloAndUnfollowUser } from '../../redux/slices/feedSlice'
import { Modal } from 'antd';
import Follower from '../follower/follower'
import SideNavbar from '../sideNavbar/sideNavbar'



function Profile() {
  const { mode } = useSelector((state) => state.darkMode)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


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
    <div className='Profile' style={{backgroundColor: mode ? '' : 'white'}}>
      <SideNavbar/>
      <div className="container">
        <div className="left-part">
          {isMyProfile && <CreatePost/>}
        {userProfile?.posts?.map(post => <ProfilePosts  key={post?._id} post={post}/>)}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <div className='user-img-name'>
            <img src={userProfile?.avatar?.url} alt="" className="user-img" />
            <div className='user-name-And-bio'>
            <h3 className="user-name" style={{color: mode ? 'white' : 'black'}}>{userProfile?.name}</h3>
              <h5 className='user-Bio'>{userProfile?.bio}</h5>
            </div>

            </div>
            <div className="follower-info">
              <div className="followers hover-link" onClick={showModal}>
                <h3 style={{color: mode ? 'white' : 'black'}}>{userProfile?.followers?.length}</h3>
              <h5 style={{color: mode ? 'white' : 'black'}}>follower</h5>
              <div className='animation'></div>
              </div>
              <div className="following hover-link" onClick={showModal}>
                <h3 style={{color: mode ? 'white' : 'black'}} >{userProfile?.followings?.length}</h3>
              <h5 style={{color: mode ? 'white' : 'black'}}>following</h5>
              <div className='animation' ></div>
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
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', height: '300px', overflowY: 'scroll'}} className="followInfoBox">
          <div>
          <h2 style={{marginBottom: '10px'}}>followers</h2>
          {feedData?.followers?.map(user => <Follower key={user._id} user={user}/>)}
          </div>
          <div>
          <h2 style={{marginBottom: '10px' }}>followings</h2>
          {feedData?.followings?.map(user => <Follower key={user._id} user={user}/>)}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Profile