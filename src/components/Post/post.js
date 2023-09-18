import React from 'react'
import './post.scss'
import  Avatar  from '../../components/Avatar/avatar'
// import Heart_like from '../../assets/heart-like.png'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { likeAndUnlikePost } from '../../redux/slices/postsSlice'




function Post({post}) {

  const dispatch = useDispatch()
  async function handlePostLikes(){
    dispatch(likeAndUnlikePost({
          postId: post._id

          
    }))

  }
  return (
    <div className='Post'>
      {/* {post.isLiked ?  : ''} */}
      {/* <img id='heart-like' className='heart-like' src={Heart_like} alt="" /> */}
       
        <div className="heading">
            <Avatar src={post?.owner?.avatar?.url}/>
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className="content">
            <img src={post?.image?.url} alt="CatImg" />
        </div>
        <div className="footer">
            <div className="likes hover-link" onClick={handlePostLikes}>
              {post?.isLiked ? <AiFillHeart style={{color: 'red'}} className='Icon hover-link'/> : <AiOutlineHeart className='Icon hover-link'/>}
            
            <h4>{`${post?.likesCount} likes`}</h4>
        </div>
        <p className='caption'>{post?.caption}</p>
        <h5 className='caption-time'>3 hours ago</h5>
        </div>

    </div>
  )
}

export default Post