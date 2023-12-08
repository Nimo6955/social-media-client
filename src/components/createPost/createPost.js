import React, { useState } from 'react'
import './createPost.scss'
import Avatar from '../Avatar/avatar'
// import dummyBackground from '../../assets/mouse.jpg'
import {BsCardImage} from 'react-icons/bs'
import { axiosClient } from '../../Utils/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, showToast } from '../../redux/slices/appConfigSlice'
import { getUserProfile } from '../../redux/slices/postsSlice'
import { TOAST_FAILURE } from '../../App'


function CreatePost() {

    const [postImg, setPostImg] = useState('');
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch()
    const myProfile = useSelector(state => state.appConfigReduser.myProfile)

    const { mode } = useSelector((state) => state.darkMode)


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = ()=>{
             if(fileReader.readyState === fileReader.DONE){
                setPostImg(fileReader.result)
             }
        }
    }

    const handlePostSubmit = async () => {
        try {
            dispatch(setLoading(true))
            if(!caption || !postImg){   
                // showToast
                dispatch(showToast({
                    type: TOAST_FAILURE,
                    message: 'All feilds are required'
                  }))
            }
            else if (caption && postImg){
                const result = await axiosClient.post('/posts', {
                    caption,
                    postImg
                });
                // console.log('post', result);
                dispatch(getUserProfile({
                    userId: myProfile?._id
                }))
            }
        } catch (e) {
            
        }finally{
            dispatch(setLoading(false))
            setCaption('')
            setPostImg('')

        }
    }
  return (
    <div className='CreatePost' style={{border: mode ? '' : '1px solid black'}}>
        <div className="left-partt">
            <Avatar src={myProfile?.avatar?.url}/>
        </div>
        <div className="right-part">
            <input type="text" style={{backgroundColor: mode ? 'black' : '', color: mode ? 'white' : ''}} className="captionInput" placeholder='Nice caption here ?' value={caption} onChange={(e) => setCaption(e.target.value)}/>
           {postImg &&  (<div className="img-container">
                <img className='post-img' src={postImg} alt="post image" />
                
            </div>)}
           
            <div className="bottom-part">
                <div className="input-post-img">
                <label className='labelImg' htmlFor="inputImg">
                        <BsCardImage/>
                        </label>
                        <input className='inputImg' id='inputImg' type="file" accept='image/*' onChange={handleImageChange} />
                </div>
                <button className='post-btn' onClick={handlePostSubmit}>Post</button>
            </div>
        </div>
    </div>
  )
}

export default CreatePost