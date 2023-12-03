import React, { useEffect, useState } from 'react'
import './profile.scss'
import ProfilePosts from '../profilePosts/profilePosts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/createPost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'
import { folloAndUnfollowUser } from '../../redux/slices/feedSlice'
import { Modal } from 'antd';
import Follower from '../follower/follower'
import SideNavbar from '../sideNavbar/sideNavbar'
import ProfileFollowerFollowing from '../profileFollowerFollowing/profileFollowerFollowing'
import user from '../../assets/user.png'
import user2 from '../../assets/user2.png'
import FooterNavbar from '../footerNavbar/footerNavbar'
import { BsPlusLg } from 'react-icons/bs'
import { setLoading, showToast } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../Utils/axiosClient'
import Avatar from '../Avatar/avatar'
import {BsCardImage} from 'react-icons/bs'
import {driver } from "driver.js";
import "driver.js/dist/driver.css";
import popoverImg from '../../assets/Questions.gif'
import popoverImg2 from '../../assets/Enthusiastic.gif'
import { TOAST_FAILURE } from '../../App'





function Profile() {

  const [seed, setSeed] = useState(null)
  const [postImg2, setPostImg2] = useState('');
  const [caption2, setCaption2] = useState('')
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


  const [isCreateModalOpen, setCreateIsModalOpen] = useState(false);

  const showCreateModal = () => {
  if(isMyProfile || isfollowing){
      setCreateIsModalOpen(true);
    };
  }

  const handleCreateOk = () => {
    setCreateIsModalOpen(false);
  };

  const handleCreateCancel = () => {
    setCreateIsModalOpen(false);
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
},[myProfile, params.userId, feedData,]);

function handleUserFollow(){
  dispatch(folloAndUnfollowUser({
    userIdToFollow: params.userId
  }))
}
var  width = document.body.offsetWidth

const handleImageChange2 = (e) => {
  const file = e.target.files[0]
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onload = ()=>{
       if(fileReader.readyState === fileReader.DONE){
          setPostImg2(fileReader.result)
       }
  }
}

const handlePostSubmit2 = async () => {
  try {
    if(!caption2 || !postImg2){   
      // showToast
      dispatch(showToast({
          type: TOAST_FAILURE,
          message: 'All feilds are required'
        }));
    setCreateIsModalOpen(false);
        setSeed(Math.random())
  }
  else if (caption2 && postImg2){

      dispatch(setLoading(true))
      const result = await axiosClient.post('/posts', {
          caption : caption2,
          postImg : postImg2
      });
      console.log('post', result);
      dispatch(getUserProfile({
          userId: myProfile?._id
      }))
      setSeed(Math.random())

    }
  } catch (e) {
      
  }finally{
      dispatch(setLoading(false))
      setCaption2('')
      setPostImg2('')

  }
}
const [isBiooModalOpen, setBiooIsModalOpen] = useState(false);

const showBiooModal = () => {
  if(userProfile?.bio?.length > 60){
    setBiooIsModalOpen(true);
  }
}

const handleBiooOk = () => {
  setBiooIsModalOpen(false);
};

const handleBiooCancel = () => {
  setBiooIsModalOpen(false);
};


var  width = document.body.offsetWidth
const location = useLocation()
let from = location?.state?.from?.pathname

if (width > 1000 && from){
const driverObj = driver({
  showButtons: [
        
    'next',
    
    // 'previous',
    'close'
  ],
  overlayColor: 'gray',
  onPopoverRender: (popover, { config, state }) => {

    if( popover.footerButtons.innerText === "Done"){

        driverObj.destroy();
        setTimeout(() =>{
          navigate('/')
        },200)  
    }
  
    if(popover.title.innerText === 'App tour'){
      const imgpop = document.createElement("img");
          imgpop.src = popoverImg
          imgpop.setAttribute("style", "height:200px")
          popover.description.appendChild(imgpop);


          const firstButton = document.createElement("button");
    firstButton.innerHTML = 'Go to Home'
    firstButton.setAttribute('style', 'background-color: #ee7837;color: black ;text-align: center ;text-shadow: none ;font-size: 14px ;padding: 5px 20px ;border-radius: 30px')
    popover.footerButtons.appendChild(firstButton)
    firstButton.addEventListener("click", () => {
      driverObj.destroy()
      navigate('/');
    })
    }
    if(popover.title.innerText === 'YaY !'){

      const imgpop2 = document.createElement("img");
          imgpop2.src = popoverImg2
          imgpop2.setAttribute("style", "height:200px")
          popover.description.appendChild(imgpop2);
    }
  
  },
  allowClose: false,
  disableActiveInteraction: true,
  steps: [
    { popover: { title: 'App tour', description: 'Have a look, what You can do !!', nextBtnText: 'Start'}},
    { element: '#creatPosts', popover: { title: 'Create Post', description: 'You can create a post by uploading an image and caption here...', nextBtnText: 'Next'} },
    { element: '#profile-card .follower-info', popover: { title: 'Followers', description: 'Your followers and following will appear here...', nextBtnText: 'Next'} },
    { element: '#profile-card .profile-buttons .update-profile', popover: { title: 'Update Profile', description: 'You can update your NAME, AVATAR & BIO here...',nextBtnText: 'Next'} },
    { element: '.Profile .sideNavbar .side-bar-routes .bookmarkbtn', popover: { title: 'Bookmarks', description: 'Your bookmarked posts will appear here...',nextBtnText: 'Next'} },
    { element: '#more-icon', popover: { title: 'Log Out & DarkMode', description: 'You can switch to lightMode and log out your profile from here...', nextBtnText: 'Next'} },
    { popover: { title: 'YaY !', description: 'You can now see posts of Your followings !!', nextBtnText: 'Go to Home'}},
    { popover: { title: 'Title', description: 'Description', nextBtnText: 'Done'}}
  ]
})
   driverObj.drive()
}

if ( width > 700 && width < 1000 && from){
const driverObj2 = driver({
  showButtons: [
    'next',
    // 'previous',
    'close'
  ],
  overlayColor: 'gray',
  onPopoverRender: (popover, { config, state }) => {
    const firstButton = document.getElementsByClassName("driver-popover-next-btn")[0];
    if( popover.footerButtons.innerText === "Done"){

        driverObj2.destroy();
        setTimeout(() =>{

          navigate('/')
        },200)
    }
    if(popover.title.innerText === 'App tour'){

      const imgpop = document.createElement("img");
          imgpop.src = popoverImg
          imgpop.setAttribute("style", "height:200px")
          popover.description.appendChild(imgpop);

          const firstButton = document.createElement("button");
    firstButton.innerHTML = 'Go to Home'
    firstButton.setAttribute('style', 'background-color: #ee7837;color: black ;text-align: center ;text-shadow: none ;font-size: 14px ;padding: 5px 20px ;border-radius: 30px')
    popover.footerButtons.appendChild(firstButton)
    firstButton.addEventListener("click", () => {
      driverObj2.destroy()
      navigate('/');
    })
    }
    if(popover.title.innerText === 'YaY !'){

      const imgpop2 = document.createElement("img");
          imgpop2.src = popoverImg2
          imgpop2.setAttribute("style", "height:200px")
          popover.description.appendChild(imgpop2);
    }

  },
  allowClose: false,
  disableActiveInteraction: true,
  steps: [
    { popover: { title: 'App tour', description: 'Have a look, what You can do !!', nextBtnText: 'Start'}},
    { element: '.MobileCreatePost', popover: { title: 'Create Post', description: 'You can create a post by uploading an image and caption here...', nextBtnText: 'Next'} },
    { element: '#profile-card .follower-info', popover: { title: 'Followers', description: 'Your followers and following will appear here...', nextBtnText: 'Next'} },
    { element: '#profile-card .profile-buttons .update-profile', popover: { title: 'Update Profile', description: 'You can update your NAME, AVATAR & BIO here...',nextBtnText: 'Next'} },
    { element: '.Profile .sideNavbar .side-bar-routes .bookmarkbtn', popover: { title: 'Bookmarks', description: 'Your bookmarked posts will appear here...',nextBtnText: 'Next'} },
    { element: '#more-icon', popover: { title: 'Log Out & DarkMode', description: 'You can switch to lightMode and log out your profile from here...', nextBtnText: 'Next'} },
    { popover: { title: 'YaY !', description: 'You can now see posts of Your followings !!', nextBtnText: 'Go to Home'}},
    { popover: { title: 'Title', description: 'Description', nextBtnText: 'Done'}}
  ]
})
    driverObj2.drive();
}

if ( width < 700 && from){
const driverObj3 = driver({
  showButtons: [
    'next',
    // 'previous',
    'close'
  ],
  overlayColor: 'gray',
  onPopoverRender: (popover, { config, state }) => {
    const firstButton = document.getElementsByClassName("driver-popover-next-btn")[0];
    if( popover.footerButtons.innerText === "Done"){

        driverObj3.destroy();
        setTimeout(() =>{

          navigate('/')
        },200)
    }
    
    if(popover.title.innerText === 'App tour'){

      const imgpop = document.createElement("img");
          imgpop.src = popoverImg
          imgpop.setAttribute("style", "height:200px")
          popover.description.appendChild(imgpop);

          const firstButton = document.createElement("button");
    firstButton.innerHTML = 'Go to Home'
    firstButton.setAttribute('style', 'background-color: #ee7837;color: black ;text-align: center ;text-shadow: none ;font-size: 14px ;padding: 5px 20px ;border-radius: 30px')
    popover.footerButtons.appendChild(firstButton)
    firstButton.addEventListener("click", () => {
      driverObj3.destroy()
      navigate('/');
    })
    }
    if(popover.title.innerText === 'YaY !'){

      const imgpop2 = document.createElement("img");
          imgpop2.src = popoverImg2
          imgpop2.setAttribute("style", "height:200px")
          popover.description.appendChild(imgpop2);
    }
  },
  allowClose: false,
  disableActiveInteraction: true,
  steps: [
    { popover: { title: 'App tour', description: 'Have a look, what You can do !!', nextBtnText: 'Start'}},
    { element: '.MobileCreatePost', popover: { title: 'Create Post', description: 'You can create a post by uploading an image and caption here...', nextBtnText: 'Next'} },
    { element: '#profile-card .follower-info', popover: { title: 'Followers', description: 'Your followers and following will appear here...', nextBtnText: 'Next'} },
    { element: '#profile-card .profile-buttons .update-profile', popover: { title: 'Update Profile', description: 'You can update your NAME, AVATAR & BIO here...',nextBtnText: 'Next'} },
    { element: '#searchBtnM', popover: { title: 'Search', description: 'Search for Your friends...',nextBtnText: 'Next'} },
    { element: '#bookmarkBtnM', popover: { title: 'Bookmarks', description: 'Your bookmarked posts will appear here...',nextBtnText: 'Next'} },
    { element: '#more-IconM', popover: { title: 'Log Out & DarkMode', description: 'You can switch to lightMode and log out your profile from here....', nextBtnText: 'Next'} },
    { popover: { title: 'YaY !', description: 'You can now see posts of Your followings !!', nextBtnText: 'Go to Home'}},
    { popover: { title: 'Title', description: 'Description', nextBtnText: 'Done'}}
  ]
})
    driverObj3.drive();
}



  return (
    <div className='Profile' style={{backgroundColor: mode ? '' : 'white'}}>
      <SideNavbar/>
      <div className="container" style={{flexDirection: userProfile?.posts?.length === 0 && !isMyProfile ? 'column-reverse' : ''}}>
        <div className="left-part" id='left-part'>
          <div className="creatPosts" id='creatPosts'>
          {width > 1000 ? 
            isMyProfile && <CreatePost/>
             : '' }
            
          </div> 
        {userProfile?.posts?.map(post => <ProfilePosts  key={post?._id} post={post}/>)}
        {userProfile?.posts?.length === 0 && isMyProfile ? 
        <h2 style={{textAlign: 'center', marginTop: '10px',color: mode ? 'white' : 'black'}}>Create your own post now !</h2>
       : ''}
        {userProfile?.posts?.length === 0 && !isMyProfile ? 
        <h2 style={{textAlign: 'center', marginTop: '10px',color: mode ? 'white' : 'black'}}>This person have NO posts</h2>
       : ''}
        </div>
        <div className="right-part">
          <div className="profile-card" id='profile-card' style={{border: mode ? '' : '1px solid black'}}>
          <div className='userInfo2'>

          
            <div className='user-img-name'>
            <img src={userProfile?.avatar?.url || user2} alt="" className="user-img" />
            <div className='user-name-And-bio'>
            <h3 className="user-name" style={{color: mode ? 'white' : 'black'}}>{userProfile?.name}</h3>
              <h6 className='user-Bio'style={{color: mode ? 'white' : 'black', marginTop: '5px'}} onClick={showBiooModal}>{userProfile?.bio?.length > 60 ? `${userProfile?.bio?.substring(0, 40)}. . .` : userProfile?.bio}</h6>
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
           
              {isMyProfile &&  <button className='update-profile hover-link' onClick={()=> {navigate('/updateProfile')}}>Update profile</button>}
           

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
      <Modal key={seed} okText="POST" okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isCreateModalOpen} onOk={handleCreateOk} onCancel={handleCreateCancel}>
      {/* <CreatePost/> */}
      <div className='CreatePost2' style={{border: mode ? '' : '1px solid black'}}>
        <div className="left-partt">
            <Avatar src={myProfile?.avatar?.url}/>
        </div>
        <div className="right-part">
            <input type="text"  className="captionInput" placeholder='Nice caption here ?' value={caption2} onChange={(e) => setCaption2(e.target.value)}/>
           {postImg2 &&  (<div className="img-container">
                <img className='post-img' src={postImg2} alt="post image" />
                
            </div>)}
           
            <div className="bottom-part">
                <div className="input-post-img">
                <label className='labelImg' htmlFor="inputImg">
                        <BsCardImage/>
                        </label>
                        <input className='inputImg' id='inputImg' type="file" accept='image/*' onChange={handleImageChange2} />
                </div>
                <button className='post-btn' onClick={handlePostSubmit2}>Post</button>
            </div>
        </div>
    </div>
      
      </Modal>
      {isMyProfile ? 
      <div className="MobileCreatePost hover-link" onClick={showCreateModal}>
        <h2><BsPlusLg style={{color: 'black'}}/></h2>
      </div> 
      : ''
      
      }
      <Modal closable={false} okButtonProps={{style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' } }} open={isBiooModalOpen} onOk={handleBiooOk} onCancel={handleBiooCancel} cancelButtonProps={{ style: {display: 'none'}}}>
        {userProfile?.bio}
      </Modal>
    </div>

  )
}

export default Profile