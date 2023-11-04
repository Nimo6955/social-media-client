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
import ProfileFollowerFollowing from '../profileFollowerFollowing/profileFollowerFollowing'
import user from '../../assets/sugnUpUser.png'
import FooterNavbar from '../footerNavbar/footerNavbar'




function Profile() {
  const { mode } = useSelector((state) => state.darkMode)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
  if(isMyProfile || isfollowing){
      setIsModalOpen(true);
    };
  }

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
          <div className="creatPosts">
            {isMyProfile && <CreatePost/>}
          </div>
        {userProfile?.posts?.map(post => <ProfilePosts  key={post?._id} post={post}/>)}
        </div>
        <div className="right-part">
          <div className="profile-card" style={{border: mode ? '' : '1px solid black'}}>
          <div className='userInfo2'>

          
            <div className='user-img-name'>
            <img src={userProfile?.avatar?.url || user} alt="" className="user-img" />
            <div className='user-name-And-bio'>
            <h3 className="user-name" style={{color: mode ? 'white' : 'black'}}>{userProfile?.name}</h3>
              <h6 className='user-Bio'style={{color: mode ? 'white' : 'black', marginTop: '5px'}}>{userProfile?.bio}</h6>
            </div>

            </div>
            <div className="follower-info">
              <div  id={`${mode ? 'followers' : ''}`}  className="followers hover-link" onClick={showModal}>
                <h3 style={{color: mode ? 'white' : 'black'}}>{userProfile?.followers?.length}</h3>
              <h5 style={{color: mode ? 'white' : 'black'}}>follower</h5>
              {isMyProfile || isfollowing ? <div className='animation' ></div> :''}
              </div>
              <div  id={`${mode ? 'following' : ''}`}  className="following hover-link" onClick={showModal}>
                <h3 style={{color: mode ? 'white' : 'black'}} >{userProfile?.followings?.length}</h3>
              <h5 style={{color: mode ? 'white' : 'black'}}>following</h5>
              {isMyProfile || isfollowing ? <div className='animation' ></div> :''} 
              </div>

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
      <Modal okButtonProps={{ style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' } }} cancelButtonProps={{style: {display: 'none'}}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', height: '300px', overflowY: 'scroll', width: 'cover'}} className="followInfoBox">
          <div>
          <h2 style={{marginBottom: '10px'}}>followers</h2>
          {userProfile?.followers?.map(user => <ProfileFollowerFollowing key={user._id} user={user}/>)}
          </div>
          <div>
          <h2 style={{marginBottom: '10px' }}>followings</h2>
          {userProfile?.followings?.map(user => <ProfileFollowerFollowing key={user._id} user={user}/>)}
          </div>
        </div>
      </Modal>
      <div className="mobileNavbar">
      <FooterNavbar/>
      </div>
    </div>
  )
}

export default Profile