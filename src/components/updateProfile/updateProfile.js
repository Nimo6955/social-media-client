import React, { useEffect, useState } from 'react'
import './updateProfile.scss'
import dummyUserImg from '../../assets/man.png'
import { useDispatch, useSelector } from 'react-redux'
import {  setLoading, updateMyProfile } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../Utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../Utils/localStoregeManager'
import { useNavigate } from 'react-router-dom'



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
    async function DeleteAccount(e) {
        try {
            dispatch(setLoading(true))
            e.preventDefault()
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
                        <input style={{backgroundColor: mode? 'black' : '', color: mode ? 'white' : ''}} className='name-input' value={name} type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
                        <input style={{backgroundColor: mode? 'black' : '', color: mode ? 'white' : ''}} className='bio-input' value={bio} type="text" placeholder='Your Bio' onChange={(e) => setBio(e.target.value)}/>
                        <input type="submit" className='btn-primary hover-link' onSubmit={handleSubmit}/>
                    </form>
                    <button onClick={DeleteAccount} className='Delete-Account btn-secondary hover-link'>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile