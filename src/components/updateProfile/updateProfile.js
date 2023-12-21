import React, { useEffect, useState } from 'react'
import './updateProfile.scss'
import dummyUserImg from '../../assets/man.png'
import { useDispatch, useSelector } from 'react-redux'
import {  setLoading, updateMyProfile } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../Utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../Utils/localStoregeManager'
import { useNavigate } from 'react-router-dom'
import { Modal  } from 'antd';
import deleteGif from '../../assets/Cancel.gif'
import deleteAccount from '../../assets/DeleteAccount.gif'
import icon1 from '../../assets/icon1.png'
import icon2 from '../../assets/icon2.png'
import icon3 from '../../assets/icon3.png'
import icon4 from '../../assets/icon4.png'
import icon5 from '../../assets/man.png'
import icon6 from '../../assets/icon6.png'
import icon7 from '../../assets/icon7.png'
import icon8 from '../../assets/icon8.png'
import icon9 from '../../assets/icon9.png'


function UpdateProfile() {
    const myProfile = useSelector(state => state.appConfigReduser.myProfile)
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [userImg, setUserImg] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

  const { mode } = useSelector((state) => state.darkMode)


    useEffect(() =>{
        setName(myProfile?.name || '')
        setBio(myProfile?.bio || '')
        setUserImg(myProfile?.avatar?.url)
    },[myProfile])

    function handleImageChange(e){
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = ()=>{
             if(fileReader.readyState === fileReader.DONE){
                setDisplayAvatar(fileReader.result)
             }
        }


    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(updateMyProfile({
            name,
            bio,
            userImg
        }))
    }
    async function DeleteAccount() {
        try {
            dispatch(setLoading(true))
            const response = await axiosClient.delete('/user/', {
            
            })
            console.log(response);
            removeItem(KEY_ACCESS_TOKEN)
            navigate('/login')
            dispatch(setLoading(false))
            
            
        } catch (e) {
            console.log(e);
            
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
       
        setIsModalOpen(true);
    }
  
    const handleOk = () => {
        setIsModalOpen(false);
        showDeleteAccountModal()
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

    function showDeleteAccountModal(){
        setIsDeleteAccountModalOpen(true);
        // e.preventDefault()
        DeleteAccount();


    }
  
    function handleDeleteAccountOk(){
      setIsDeleteAccountModalOpen(false);
    };
  
    function handleDeleteAccountCancel(){
      setIsDeleteAccountModalOpen(false);
    };
    const [isAvatarOpen, setAvatarOpen] = useState(false);

   const [displayAvatar, setDisplayAvatar] = useState('')

    function showAvatarModal(){
     setAvatarOpen(true);


   }

   function handleAvatarOk() {
     setAvatarOpen(false);
   };
   function handleAvatarCancel(){
     setAvatarOpen(false);
   };
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
   function handleSubmit(){
    // e.preventDefault()
    setAvatarOpen(false);
    dispatch(updateMyProfile({
        userImg : displayAvatar
  
    }))
  }
    return (
        <div className='UpdateProfile' style={{backgroundColor: mode ? '' : 'white'}}>
            <div className="container">
                <div className="left-part">
                    <div className="input-user-img">
                        <label className='labelImg'onClick={showAvatarModal}>
                            <img src={userImg ? userImg : dummyUserImg} alt={name} />
                        </label>
                        {/* <input className='inputImg' id='inputImg' type="file" accept='image/*' onChange={handleImageChange} /> */}
                    </div>
                </div>
                <div className="right-part">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="" style={{color: mode ? 'white' : '', textDecoration: 'underline', marginBottom: '5px'}}>Name</label>
                        <input style={{backgroundColor: mode? 'black' : '', color: mode ? 'white' : ''}} className='name-input' maxLength={12} value={name} type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="" style={{color: mode ? 'white' : '', textDecoration: 'underline', marginBottom: '5px'}}>Bio</label>
                        <input style={{backgroundColor: mode? 'black' : '', color: mode ? 'white' : ''}} className='bio-input' value={bio} type="text" placeholder='Your Bio' onChange={(e) => setBio(e.target.value)}/>
                        <input type="submit" className='submitBtn hover-link' onSubmit={handleSubmit}/>
                    </form>
                    <button onClick={showModal} className='Delete-Account hover-link'>Delete Account</button>
                </div>
            </div>
            <Modal closable={false} okText='Delete' okButtonProps={{style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' } }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelButtonProps={{ style: {borderRadius: '30px',width: '80px'}}}>
                <h2 style={{textAlign: 'center'}}>Are you sure you want to delete this account ??</h2>
                <h5 style={{textAlign: 'center'}}>All your data will be deleted permanently !</h5>
                <img style={{height: '300px', display:'flex', marginInline: 'auto'}} src={deleteGif} alt="" />
      </Modal>
            <Modal closable={false} maskClosable={false} okButtonProps={{style: { display:'none' } }} open={isDeleteAccountModalOpen} onOk={handleDeleteAccountOk} onCancel={handleDeleteAccountCancel} cancelButtonProps={{ style: { display:'none' }}}>
                <h2 style={{textAlign:'center'}}>Please Wait...</h2>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img className='deleteAccountImg' src={deleteAccount} alt="" />
            </div>
      </Modal>
      <Modal keyboard={false} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isAvatarOpen} onOk={handleAvatarOk} onCancel={handleAvatarCancel}>
       <h3 style={{textAlign: 'center'}}>Update your avatar !!</h3>         
        <div className="user">
                <img src={displayAvatar || userImg} alt="" id='user'/>
            </div>
       <h3 style={{textAlign: 'center'}}>Choose from avatars given below.</h3>         
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

        <div className="uploadAvtar" style={{marginBottom: '10px'}}>

<label htmlFor="inputImg" className='AvatarButton2'>UPLOAD FROM GALLERY
        {/* <button className='AvatarButton1 hover-link' id='inputImg'>UPLOAD FROM GALLERY</button> */}
</label>
<input className='hover-link' id='inputImg' type="file" accept='image/*' onChange={handleImageChange} style={{display: 'none'}}/>
        </div>
        <hr/>
        <button style={{ display: 'flex',marginInline: 'auto', marginTop :'10px',padding: '10px 20px',borderRadius: '30px',outline: 'none', border: 'none', backgroundColor:'#ee7837'}} className='AvatarButton1 hover-link' onClick={handleSubmit}>SUBMIT</button>

      </Modal>
        </div>
    )
}

export default UpdateProfile