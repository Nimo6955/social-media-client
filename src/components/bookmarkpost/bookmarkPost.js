import React, { useState } from 'react'
import './bookmarkPost.scss'
import { useDispatch, useSelector } from 'react-redux'
import {BsBookmark} from 'react-icons/bs'
import {PiBookmarkSimpleFill} from 'react-icons/pi'
import { bookmarkPost } from '../../redux/slices/feedSlice'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'
import { Modal  } from 'antd';
var ta = require('time-ago')



function BookmarkPost({post}) {

    const { mode } = useSelector((state) => state.darkMode)
    const dispatch = useDispatch()

    function unBookmarkMyPost(){
      dispatch(bookmarkPost({
        postId: post._id
      }));
      dispatch(showToast({
        type: TOAST_SUCCESS,
        message: 'Post removed from Bookmarks'
      }))
    }
    const [iscaptionModalOpen, setCaptionIsModalOpen] = useState(false);

  const showCaptionModal = () => {
    if(post?.caption?.length > 60){
      setCaptionIsModalOpen(true);
    }
  }
  
  const handleCaptionOk = () => {
    setCaptionIsModalOpen(false);
  };
  
  const handleCaptionCancel = () => {
    setCaptionIsModalOpen(false);
  };
  return (
    <div className='bookmarkPost' style={{backgroundColor: mode? '' : 'whitesmoke', border: mode ? '' : '1px solid #2d3436'}}>
     
       
        <div style={{backgroundColor: mode ? '' : 'white'}} className="heading2">
           <div className='userImg'>
             {/* <Avatar  src={post?.owner?.avatar?.url}/> */}
             <img src={post?.owner?.avatar?.url} alt="" />

           </div>
             
            <h4 style={{color: mode ? '' : 'black'}}  className='userName'>{post?.owner?.name}</h4>
        </div>
        <div className="content" >
            <img src={post?.image?.url} alt="content image" />
        </div>
        <div style={{backgroundColor: mode ? '' : 'white'}} className="footer">
          <div>
        {/* <p style={{color: mode ? '' : 'black'}}  className='caption'> <span style={{color: mode ? '' : 'black'}}  className='userName-caption'> {post?.owner?.name}</span>  {post?.caption}</p> */}
        <p style={{color: mode ? '' : 'black'}}  className='caption' onClick={showCaptionModal}> <span style={{color: mode ? '' : 'black'}}  className=' '> {post?.owner?.name}</span> {post?.caption?.length > 60 ? `${post?.caption?.substring(0, 40)}. . .` : post?.caption}</p>
        <h5 style={{color: mode ? '' : '#cccccc'}}  className='caption-time'>{ta.ago(post?.createdAt)}</h5>

          </div>
          <PiBookmarkSimpleFill className='hover-link' style={{fontSize:'1.7rem', marginRight:'10px',color:'black'}}
           onClick={unBookmarkMyPost}
           />
        </div>
        <Modal closable={false} okButtonProps={{style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' } }} open={iscaptionModalOpen} onOk={handleCaptionOk} onCancel={handleCaptionCancel} cancelButtonProps={{ style: {display: 'none'}}}>
        {post?.caption}
      </Modal>

    </div>
  )
}

export default BookmarkPost