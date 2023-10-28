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



function UserInfoSelect() {
    const [isAvatarOpen, setAvatarOpen] = useState(false);

    function showAvatarModal(){
     setAvatarOpen(true);
     setBioOpen(false);

   }

   function handleAvatarOk() {
     setAvatarOpen(false);
   };
   function handleAvatarCancel(){
     setAvatarOpen(false);
   };
    
   const [displayAvatar, setDisplayAvatar] = useState('')

   function selectAvatar(event){
    // console.dir(event.target.src)
    const src = event.target.src
    setDisplayAvatar(src)
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

   }

   function handleBioOk() {
     setBioOpen(false);
   };
   function handleBioCancel(){
     setBioOpen(false);
   };
    
  return (
    <div>
        <div className="userInfoSelect">
            <div className="dummyDiv">
                
        <Modal keyboard={false} maskClosable={false} closable={false} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isAvatarOpen} onOk={handleAvatarOk} onCancel={handleAvatarCancel}>
        <div className="user">
    
                <img src={displayAvatar ||user} alt="" id='user'/>
            </div>
        <h3 style={{textAlign:'center'}}>Choose Your Avatar</h3>
        <hr/>
        <div className='allAvatars'>
            <div className="box1">

            <div className="Avatar1 Avatar" onClick={selectAvatar}>
    
                <img src={icon1} alt="" />
            </div>

            <div className="Avatar2 Avatar" onClick={selectAvatar}>
                
                <img src={icon2}  alt="" />
            </div>

            <div className="Avatar3 Avatar" onClick={selectAvatar}>
                
                <img src={icon3}  alt="" />
            </div>
            </div>

            <div className="box2">

            <div className="Avatar4 Avatar" onClick={selectAvatar}>
                
                <img src={icon4}  alt="" />
            </div>

            <div className="Avatar5 Avatar" onClick={selectAvatar}>
                
                <img src={icon5}  alt="" />
            </div>

            <div className="Avatar6 Avatar" onClick={selectAvatar}>
                
                <img src={icon6}  alt="" />
            </div>
            </div>


            <div className="box3">

            <div className="Avatar7 Avatar" onClick={selectAvatar}>
                
                <img src={icon7}  alt="" />
            </div>

            <div className="Avatar8 Avatar" onClick={selectAvatar}>
                
                <img src={icon8}  alt="" />
            </div>

            <div className="Avatar9 Avatar" onClick={selectAvatar}>
                
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
      <Modal  keyboard={false} maskClosable={false} closable={false} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isBioOpen} onOk={handleBioOk} onCancel={handleBioCancel}>
      <div className="bio">
        <h3>UPDATE YOUR BIO !</h3>
        <input type="text" placeholder='Write bio here...' className='bioInput' />
        <div className="biobuttons">

        <button className='BioButton1 hover-link' onClick={showAvatarModal}>GO BACK</button>
        <button className='BioButton2 hover-link'>SAVE</button>
        </div>
      </div>
      </Modal>

            </div>
        </div>
    </div>
  )
}

export default UserInfoSelect