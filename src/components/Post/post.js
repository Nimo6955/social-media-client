import React from 'react'
import './post.scss'
import  Avatar  from '../../components/Avatar/avatar'
import Heart_like from '../../assets/heart-like.png'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { deletePost, likeAndUnlikePost } from '../../redux/slices/postsSlice'
import {useNavigate} from 'react-router-dom'
import {showToast} from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'




function Post({post}) {

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

  const navigate = useNavigate()
  

  
  return (
    <div className='Post'>
     
       
        <div className="heading2" onClick={() => navigate(`/profile/${post.owner._id}`)}>
           <div className='userImg'>
             {/* <Avatar  src={post?.owner?.avatar?.url}/> */}
             <img src={post?.owner?.avatar?.url} alt="" />

           </div>
             
            <h4 className='userName'>{post?.owner?.name}</h4>
        </div>
        <div className="content" >
            <img src={post?.image?.url} alt="content image" />
        </div>
        <div className="footer">
            <div className="likes hover-link" onClick={handlePostLikes}>
              {post?.isLiked ? <AiFillHeart  style={{color: 'red'}} className='Icon hover-link'/> : <AiOutlineHeart className='Icon hover-link'/>}
            <h4 className='likes-text'>{`${post?.likesCount} likes`}</h4>
        </div>
        <p className='caption'> <span className='userName-caption'> {post?.owner?.name}</span>  {post?.caption}</p>
        <h5 className='caption-time'>{post?.timeAgo}</h5>
        </div>

    </div>
  )
}

export default Post