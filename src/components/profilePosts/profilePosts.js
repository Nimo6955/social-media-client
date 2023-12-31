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
import { bookmarkPost, commentOnPost } from '../../redux/slices/feedSlice'
import {PiBookmarkSimpleFill, PiBookmarkSimple} from 'react-icons/pi'
import {FaRegComment} from 'react-icons/fa'
import Comments from '../comments/comments'
import ProfileComments from '../profileComments/profileComments'
import deleteGif from '../../assets/Cancel.gif'







function ProfilePosts({post}) {

// const feedData = useSelector(state => state.feedDataReducer.feedData)
const myProfile = useSelector(state => state.appConfigReduser.myProfile)
// console.log(myProfile?.name, myProfile?.avatar);


  const [OpenComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState('');





  const CommentModal = () => {
    setOpenComment(true);
  };

  const postComment = () => {
    dispatch(commentOnPost({
      postId: post._id,
      comment: comment,
      commentsImage:  myProfile?.avatar?.url,
      commentsName: myProfile?.name,
    }));
    setComment('')
    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: 'Comment Added'
    }))
    setOpenComment(false);

  };

  const { mode } = useSelector((state) => state.darkMode)


  const [seed, setSeed] = useState(null)
  const showModal = () => {
    setIsModalOpen(true);
    setSeed(Math.random())
  };

    const content = (
        <div>
        <p onClick={showModal} className='hover-link edit-delete'><FiEdit/> <p> Edit</p></p>
        <hr style={{marginBlock:'8px'}} />
        <p className='hover-link edit-delete' onClick={showPostDeleteModal}><ImBin2/> <p> Delete</p></p>
        </div>
        );


        const [isModalOpen, setIsModalOpen] = useState(false);
        const userProfile = useSelector(state => state.postsReducer.userProfile)
        var findPost = userProfile?.posts?.findIndex((item) => item._id === post?._id)

        var index = userProfile?.bookmarks?.find((item) => item._id === post?._id)


     
      
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
          setOpenComment(false);
        };

  const dispatch = useDispatch()
  async function handlePostLikes(){

    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: `${post.isLiked ? 'Unliked' : 'Liked'}`
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
  const [caption, setCaption] = useState('');

  
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

function bookmarkMyPost(){
  dispatch(bookmarkPost({
    postId: post._id
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

const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);

    function showPostDeleteModal(){
       setSeed(Math.random())
        setIsPostDeleteModalOpen(true);
    }
  
    function handlePostDeleteOk(){
      deleteMyPost()
      setIsPostDeleteModalOpen(false);

    };
  
    function handlePostDeleteCancel(){
      setIsPostDeleteModalOpen(false);
    };
  
  return (
    <>
    <div className='PostProfile' style={{backgroundColor: mode? '' : 'whitesmoke', border: mode ? '' : '1px solid #2d3436'}}>
     
       
        <div style={{backgroundColor: mode ? '' : 'white'}} className="headingProfilePost" onClick={() => navigate(`/profile/${post.owner._id}`)}>
           <div className='header-details'>
           <div className='userImg'>
             <img src={post?.owner?.avatar?.url} alt="" />

           </div>
            <h4 style={{color: mode ? '' : 'black'}} className='userName'>{post?.owner?.name}</h4>

           </div>
           <div style={{ whiteSpace: 'nowrap' }}>
<Popover key={seed}  className='more-icon' placement="top" content={content} trigger="click">
<Button style={{border: 'none', outline:'none', backgroundColor: mode? '#263238' : 'white'}}>< BsThreeDotsVertical style={{color: mode?  'white' : 'black'}}/></Button>
</Popover>

</div>
             
        </div>
        <div className="contentProfilePost"  onDoubleClick={handlePostLikes}>
            <img className='contentImg' src={post?.image?.url} alt="content image" />
            {post?.isLiked ? <img className='likedImg' id='likedImg' src={Heart_like} alt="" /> : ''}

        </div>
        <div style={{backgroundColor: mode ? '' : 'white'}} className="footerProfilePost">
        <div>
            <div className='likes-comments  '>

            <div className="likes hover-link" onClick={handlePostLikes}>
              {post?.isLiked ? <AiFillHeart  style={{color: 'red'}} className='Icon hover-link'/> : <AiOutlineHeart className='Icon hover-link' style={{color: mode ? 'white' : 'black'}}/>}
            <h5 style={{color: mode ? '' : 'black'}} className='likes-text'>{`${post?.likesCount}`}</h5>
        </div>
        <div className='comments hover-link'>
              <FaRegComment className='commentsIcon' style={{ marginLeft:'10px',color: mode ? 'white' : 'black'}} onClick={CommentModal}/>
              <h5 style={{color: mode ? '' : 'black'}} className="comments-text">{post?.comments?.length}</h5>
        </div>
        </div>
        <p style={{color: mode ? '' : 'black'}}  className='caption' onClick={showCaptionModal}> <span style={{color: mode ? '' : 'black'}}  className='userName-caption'> {post?.owner?.name}</span>{post?.caption?.length > 60 ? `${post?.caption?.substring(0, 40)}. . .` : post?.caption}</p>
        <h5 style={{color: mode ? '' : '#cccccc'}}  className='caption-time'>{post?.timeAgo}</h5>
          </div>
          <div  onClick={bookmarkMyPost} >
            
        {index ? <PiBookmarkSimpleFill onClick={() => dispatch(showToast({
      type: TOAST_SUCCESS,
      message: 'Post removed from Bookmarks'
    }))}  className='hover-link' style={{fontSize:'1.7rem', marginRight:'10px',color: 'black'}}/> :   <PiBookmarkSimple onClick={() => dispatch(showToast({
      type: TOAST_SUCCESS,
      message: 'Post Added to Bookmarks'
    }))} className='hover-link' style={{fontSize:'1.7rem', marginRight:'10px',color: mode ? 'white' : 'black'}} />}
          </div>   
          
       </div>

       <Modal closable={false} okText='Post'  okButtonProps={{disabled: comment === '' ?  true : false, style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' } }} open={OpenComment} onOk={postComment} onCancel={handleCancel} cancelButtonProps={{ style: {borderRadius: '30px', width: '80px'}}}>

<div className='allComments' style={{height: '300px', overflowY: 'scroll'}}>
{userProfile?.posts?.[findPost]?.comments?.map(comments => <ProfileComments key={comments._id} postId={post._id} comments={comments}/>)}
</div>
<div id='openComments'>
<h4>comment as {userProfile?.name} </h4>
<input placeholder='Add a comment...' id='commentsInput' className='commentsInput' type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
</div>
</Modal>
    </div>
    <Modal key={seed} okText='Update' okButtonProps={{ style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' } }} cancelButtonProps={{ style: { borderRadius: '30px', color: 'black',width: '80px' } }} id='modal' style={{zIndex: '10'}} title="update your post" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <label className='labelImg' htmlFor="updateInputImg" style={{height: '300px'}}>
                       <img id='updateBeforeImg' style={{aspectRatio: '16/9',width:'100%'}} src={post?.image?.url} alt="" />
                       <img id='updateAfterImg' style={{aspectRatio: '16/9',width:'100%', display:'none'}} src={postImg} alt="" />
                        </label>
      <input className='inputImg' id='updateInputImg' style={{display:'none'}} type="file" accept='image/*' onChange={handleImageChange} />
      <input id='updateInput' placeholder='update caption ?' type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </Modal>
      <Modal closable={false} okButtonProps={{style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' } }} open={iscaptionModalOpen} onOk={handleCaptionOk} onCancel={handleCaptionCancel} cancelButtonProps={{ style: {display: 'none'}}}>
        {post?.caption}
      </Modal>
      <Modal closable={false} okText='Delete' okButtonProps={{style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' } }} open={isPostDeleteModalOpen} onOk={handlePostDeleteOk} onCancel={handlePostDeleteCancel} cancelButtonProps={{ style: {borderRadius: '30px',width: '80px'}}}>
                <h2 style={{textAlign: 'center'}}>Are you sure you want to delete this post ??</h2>
                <img style={{height: '300px', display:'flex', marginInline: 'auto'}} src={deleteGif} alt="" />
      </Modal>
    </>
  )
}

export default ProfilePosts