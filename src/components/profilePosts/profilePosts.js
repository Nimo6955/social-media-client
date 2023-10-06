import React ,{ useState }  from 'react'
import './profilePosts.scss'
import  Avatar  from '../../components/Avatar/avatar'
import Heart_like from '../../assets/heart-like.png'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, likeAndUnlikePost, updatePost } from '../../redux/slices/postsSlice'
import {useNavigate} from 'react-router-dom'
import {showToast} from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'
import {ImBin2} from 'react-icons/im'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { Button, Popover, Modal  } from 'antd';






function ProfilePosts({post}) {

  const { mode } = useSelector((state) => state.darkMode)


  const showModal = () => {
    setIsModalOpen(true);
  };

    const content = (
        <div>
        <p onClick={showModal} className='hover-link edit-delete'><FiEdit/> <p> Edit</p></p>
        <hr style={{marginBlock:'8px'}} />
        <p className='hover-link edit-delete' onClick={deleteMyPost}><ImBin2/> <p> Delete</p></p>
        </div>
        );


        const [isModalOpen, setIsModalOpen] = useState(false);

     
      
        const handleOk = async () => {
          setIsModalOpen(false);
          dispatch(updatePost({
            caption: caption,
            postImg: postImg,
            postId: post._id
          }))
        };
      
        const handleCancel = () => {
          setIsModalOpen(false);
        };

  const dispatch = useDispatch()
  async function handlePostLikes(){

    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: `${post.isLiked ? 'unliked' : 'liked'}`
    }))
    dispatch(likeAndUnlikePost({
          postId: post._id    
    }))
    
  }
  async function deleteMyPost(){
     dispatch(deletePost({
      postId: post._id 
    }))
  }

  const navigate = useNavigate()

  const [postImg, setPostImg] = useState('');
  const [caption, setCaption] = useState('')
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = ()=>{
         if(fileReader.readyState === fileReader.DONE){
            setPostImg(fileReader.result)
            const newimg = document.getElementById('updateAfterImg')
            newimg.style.display = 'block'
            const oldimg = document.getElementById('updateBeforeImg')
            oldimg.style.display = 'none'
         }
    }
}

  
  return (
    <>
    <div className='PostProfile' style={{backgroundColor: mode? '' : 'whitesmoke', border: mode ? '' : '1px solid #2d3436'}}>
     
       
        <div style={{backgroundColor: mode ? '' : 'white'}} className="headingProfilePost" onClick={() => navigate(`/profile/${post.owner._id}`)}>
           <div className='userImg'>
             <img src={post?.owner?.avatar?.url} alt="" />

            <h4 style={{color: mode ? '' : 'black'}} className='userName'>{post?.owner?.name}</h4>
           </div>
           <div style={{ whiteSpace: 'nowrap' }}>
<Popover  className='more-icon' placement="top" content={content} trigger="click">
<Button style={{border: 'none', outline:'none', backgroundColor: mode? '#263238' : 'white'}}>< BsThreeDotsVertical style={{color: mode?  'white' : 'black'}}/></Button>
</Popover>

</div>
             
        </div>
        <div className="contentProfilePost" >
            <img src={post?.image?.url} alt="content image" />
        </div>
        <div style={{backgroundColor: mode ? '' : 'white'}} className="footerProfilePost">
            <div className="likes hover-link" onClick={handlePostLikes}>
              {post?.isLiked ? <AiFillHeart  style={{color: 'red'}} className='Icon hover-link'/> : <AiOutlineHeart className='Icon hover-link'/>}
            <h4 style={{color: mode ? '' : 'black'}} className='likes-text'>{`${post?.likesCount} likes`}</h4>
        </div>
        <p style={{color: mode ? '' : 'black'}} className='caption'> <span style={{color: mode ? '' : 'black'}} className='userName-caption'> {post?.owner?.name}</span>  {post?.caption}</p>
        <h5 style={{color: mode ? '' : '#cccccc'}} className='caption-time'>{post?.timeAgo}</h5>
        </div>

    </div>
    <Modal id='modal' style={{zIndex: '10'}} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <label className='labelImg' htmlFor="updateInputImg" style={{height: '300px'}}>
                       <img id='updateBeforeImg' style={{height: '200px  ', aspectRatio: '16/9'}} src={post?.image?.url} alt="" />
                       <img id='updateAfterImg' style={{height: '200px  ', aspectRatio: '16/9', display:'none'}} src={postImg} alt="" />
                        </label>
      <input className='inputImg' id='updateInputImg' style={{display:'none'}} type="file" accept='image/*' onChange={handleImageChange} />
      <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </Modal>
    </>
  )
}

export default ProfilePosts