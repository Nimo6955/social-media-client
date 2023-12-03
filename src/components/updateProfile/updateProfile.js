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
                setUserImg(fileReader.result)
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
    return (
        <div className='UpdateProfile' style={{backgroundColor: mode ? '' : 'white'}}>
            <div className="container">
                <div className="left-part">
                    <div className="input-user-img">
                        <label className='labelImg' htmlFor="inputImg">
                            <img src={userImg ? userImg : dummyUserImg} alt={name} />
                        </label>
                        <input className='inputImg' id='inputImg' type="file" accept='image/*' onChange={handleImageChange} />
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

        </div>
    )
}

export default UpdateProfile