import React, { useEffect, useState } from 'react'
import './userInfoSelect.scss'
import { Modal } from 'antd';
import icon1 from '../../assets/icon1.png'
import icon2 from '../../assets/icon2.png'
import icon3 from '../../assets/icon3.png'
import icon4 from '../../assets/icon4.png'
import icon5 from '../../assets/man.png'
import icon6 from '../../assets/icon6.png'
import icon7 from '../../assets/icon7.png'
import icon8 from '../../assets/icon8.png'
import icon9 from '../../assets/icon9.png'
import user from '../../assets/sugnUpUser.png'
import { useDispatch, useSelector } from 'react-redux';
import Follower from '../../components/follower/follower';
import { updateMyProfile } from '../../redux/slices/appConfigSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import SignupSuggestions from '../../components/signupSuggestions/signupSuggestions';
import { getFeedData } from '../../redux/slices/feedSlice';



function UserInfoSelect() {

  const location = useLocation()
  const navigate = useNavigate()
  const [seed, setSeed] = useState(null)
  const myProfile = useSelector(state => state.appConfigReduser.myProfile)

  // const userProfile = useSelector(state => state.postsReducer.userProfile)
const feedData = useSelector(state => state.feedDataReducer.feedData)

const [bio, setBio] = useState('');


    const [isAvatarOpen, setAvatarOpen] = useState(false);
    function showAvatarModal(){
     setAvatarOpen(true);
     setBioOpen(false);
     setFollowerOpen(false);


   }

   function handleAvatarOk() {
     setAvatarOpen(false);
   };
   function handleAvatarCancel(){
     setAvatarOpen(false);
   };
    
   const [displayAvatar, setDisplayAvatar] = useState('')

   async function selectAvatar(event){
    const src = event.target.src
    setDisplayAvatar(src)
    const base64 = await fetch(src)
  .then(response => response.blob())
  .then(blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((res) => {
      reader.onloadend = () => {
      res(reader.result);
    }})
  })
  setDisplayAvatar(base64);
    
   }

   const dispatch = useDispatch()
function handleSubmit(){
  // e.preventDefault()
  dispatch(updateMyProfile({
      userImg : displayAvatar,
      bio: bio

  }))
}
   useEffect(() => {
    let ignore = false;
    
    if (!ignore)  showAvatarModal()
    return () => { ignore = true; }
  
    },[])
    
// bio Modal

    const [isBioOpen, setBioOpen] = useState(false);

    function showBioModal(){
     setBioOpen(true);
     setAvatarOpen(false);
     setFollowerOpen(false);
   

   }

   function handleBioOk() {
     setBioOpen(false);
   };
   function handleBioCancel(){
     setBioOpen(false);
   };

  //  follower Modal

   const [isFollowerOpen, setFollowerOpen] = useState(false);

    function showFollowerModal(){
      dispatch(getFeedData())
      handleSubmit()
      // setTimeout(() => {
        setFollowerOpen(true);
      // }, 300);
     setAvatarOpen(false);
     setBioOpen(false);


   }

   function handleFollowerOk() {
     setFollowerOpen(false);
   };
   function handleFollowerCancel(){
     setFollowerOpen(false);
   };
    
  return (
    <div>
        <div className="userInfoSelect">
            <div className="dummyDiv">
                
        <Modal keyboard={false} maskClosable={false} maskStyle={{background: 'black'}} closable={false} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isAvatarOpen} onOk={handleAvatarOk} onCancel={handleAvatarCancel}>
        <div className="user">
                <img src={displayAvatar || user} alt="" id='user'/>
            </div>
        <h3 style={{textAlign:'center'}}>Choose Your Avatar</h3>
        <hr/>
        <div className='allAvatars'>
            <div className="box1">

            <div className="Avatar1 Avatar" id='icon1' onClick={selectAvatar}>
    
                <img src={icon1} alt="" />
            </div>

            <div className="Avatar2 Avatar" id='icon2' onClick={selectAvatar}>
                
                <img src={icon2}  alt="" />
            </div>

            <div className="Avatar3 Avatar" id='icon3' onClick={selectAvatar}>
                
                <img src={icon3}  alt="" />
            </div>
            </div>

            <div className="box2">

            <div className="Avatar4 Avatar" id='icon4' onClick={selectAvatar}>
                
                <img src={icon4}  alt="" />
            </div>

            <div className="Avatar5 Avatar" id='icon5' onClick={selectAvatar}>
                
                <img src={icon5}  alt="" />
            </div>

            <div className="Avatar6 Avatar" id='icon6' onClick={selectAvatar}>
                
                <img src={icon6}  alt="" />
            </div>
            </div>


            <div className="box3">

            <div className="Avatar7 Avatar" id='icon7' onClick={selectAvatar}>
                
                <img src={icon7}  alt="" />
            </div>

            <div className="Avatar8 Avatar" id='icon8' onClick={selectAvatar}>
                
                <img src={icon8}  alt="" />
            </div>

            <div className="Avatar9 Avatar" id='icon9' onClick={selectAvatar}>
                
                <img src={icon9}  alt="" />
            </div>
            </div>
        </div>
<h4 style={{textAlign: 'center'}}>Or</h4>

        <div className="uploadAvtar">

        <button className='AvatarButton1 hover-link'>UPLOAD FROM GALLERY</button>
        <button className='AvatarButton2 hover-link' onClick={showBioModal}>NEXT</button>
        </div>
      </Modal>
      <Modal  keyboard={false} maskClosable={false} maskStyle={{background: 'black'}} closable={false} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isBioOpen} onOk={handleBioOk} onCancel={handleBioCancel}>
      <div className="bio">
        <h3>UPDATE YOUR BIO !</h3>
        <input type="text" placeholder='Write your bio here...' value={bio} className='bioInput' onChange={(e) => setBio(e.target.value)}/>
        <div className="biobuttons">

        <button className='BioButton1 hover-link' onClick={showAvatarModal}>GO BACK</button>
        <button className='BioButton2 hover-link' onClick={showFollowerModal}>SAVE</button>
        </div>
      </div>
      </Modal>
      <Modal keyboard={false} maskClosable={false}  maskStyle={{background: 'black'}} closable={false} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isFollowerOpen} onOk={handleFollowerOk} onCancel={handleFollowerCancel}>
      <div >
          <h2 style={{marginBottom: '10px'}}>Suggested people you can follow</h2>
          {feedData?.signUpSuggestions?.map(user => <SignupSuggestions key={user._id} user={user} />)}
          </div>
          <button className='skipButton'onClick={() =>navigate(`/profile/${myProfile?._id}`,{state: { from : location}})}>SKIP</button>
      </Modal>

            </div>
        </div>
    </div>
  )
}

export default UserInfoSelect