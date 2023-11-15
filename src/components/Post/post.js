import React, { useState } from 'react'
import './post.scss'
import  Avatar  from '../../components/Avatar/avatar'
import Heart_like from '../../assets/heart-like.png'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { likeAndUnlikePost } from '../../redux/slices/postsSlice'
import {useNavigate} from 'react-router-dom'
import {showToast} from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'
import {PiBookmarkSimpleFill, PiBookmarkSimple} from 'react-icons/pi'
import { bookmarkPost, commentOnPost } from '../../redux/slices/feedSlice'
import { Modal } from 'antd';
import {FaRegComment} from 'react-icons/fa'
import Comments from '../comments/comments'





function Post({post}) {
  const [OpenComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState('');
  // const [seed , setSeed] = useState(null)



const handleCancel = () => {
    setOpenComment(false);
    
  }

  const CommentModal = () => {
    setOpenComment(true);
  };

  const postComment = () => {
    dispatch(commentOnPost({
      postId: post._id,
      comment: comment,
      commentsImage:  feedData?.avatar?.url,
      commentsName: feedData.name,
    }));
    setComment('')
    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: 'Comment Added'
    }))
    // setOpenComment(false);

  };

  

  const { mode } = useSelector((state) => state.darkMode)

  const feedData = useSelector(state => state.feedDataReducer.feedData)
  var index = feedData?.bookmarks?.find((item) => item._id === post?._id)
  var findPost = feedData?.posts?.findIndex((item) => item._id === post?._id)
 

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
  

  function bookmarkMyPost(){
    dispatch(bookmarkPost({
      postId: post._id
    }))
  }
  

  
  return (
    <div className='Post' style={{backgroundColor: mode? '' : 'whitesmoke', border: mode ? '' : '1px solid #2d3436'}}>
     
       
        <div style={{backgroundColor: mode ? '' : 'white'}} className="heading2" onClick={() => navigate(`/profile/${post.owner._id}`)}>
           <div className='userImg'>
             {/* <Avatar  src={post?.owner?.avatar?.url}/> */}
             <img src={post?.owner?.avatar?.url} alt="" />

           </div>
             
            <h4 style={{color: mode ? '' : 'black'}}  className='userName'>{post?.owner?.name}</h4>
        </div>
        <div className="content" style={{backgroundColor: mode ? '#263238': 'white'}}>
            <img src={post?.image?.url} alt="content image" />
        </div>
        <div style={{backgroundColor: mode ? '' : 'white'}} className="footer">
          <div>
            <div className='likes-comments'>

            <div className="likes hover-link" onClick={handlePostLikes}>
              {post?.isLiked ? <AiFillHeart  style={{color: 'red'}} className='Icon hover-link'/> : <AiOutlineHeart className='Icon hover-link' style={{color: mode ? 'white' : 'black'}}/>}
            <h5 style={{color: mode ? '' : 'black'}} className='likes-text'>{`${post?.likesCount}`}</h5>
        </div>
        <div className='comments hover-link'>
              <FaRegComment className='commentsIcon' style={{ marginLeft:'10px',color: mode ? 'white' : 'black'}} onClick={CommentModal}/>
              <h5 style={{color: mode ? '' : 'black'}} className="comments-text">{post?.comments?.length}</h5>
        </div>
        </div>
        <p style={{color: mode ? '' : 'black'}}  className='caption'> <span style={{color: mode ? '' : 'black'}}  className=' '> {post?.owner?.name}</span>  {post?.caption}</p>
        <h5 style={{color: mode ? '' : '#cccccc'}}  className='caption-time'>{post?.timeAgo}</h5>
          </div>
          <div  onClick={bookmarkMyPost} >
            
        {index ? <PiBookmarkSimpleFill className='hover-link' style={{fontSize:'1.7rem', marginRight:'10px',color: 'black'}}/> :   <PiBookmarkSimple className='hover-link' style={{fontSize:'1.7rem', marginRight:'10px',color: mode ? 'white' : 'black'}} />}
          </div>


        
        </div>
        <Modal okText='Post' closable={false} okButtonProps={{disabled: comment === '' ?  true : false, style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' } }} open={OpenComment} onOk={postComment} onCancel={handleCancel} cancelButtonProps={{ style: {borderRadius: '30px',width: '80px'}}}>

          <div className='allComments' style={{height: '300px', overflowY: 'scroll'}}>
        {feedData?.posts?.[findPost]?.comments?.map(comments => <Comments key={comments._id} postId={post._id} comments={comments}/>)}
          </div>
        <div id='openComments'>
          <h4>comment as {feedData?.name} </h4>
        <input placeholder='Add a comment...' id='commentsInput' className='commentsInput' type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
      </Modal>
    </div>
  )
}

export default Post