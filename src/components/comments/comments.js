import React,{ useState }  from 'react'
import './comments.scss'
import {FiEdit} from 'react-icons/fi'
import {ImBin2} from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Popover  } from 'antd';
import {BsThreeDotsVertical} from 'react-icons/bs'
import  Avatar  from '../../components/Avatar/avatar'
import { deleteMyComment } from '../../redux/slices/feedSlice'

function Comments({comments, postId}) {

  const dispatch = useDispatch()

  function deleteComment(){
    setSeed(Math.random())
    dispatch(deleteMyComment({
      commentsId: comments._id,
      postId: postId
    }))
    console.log(comments._id);
    console.log(postId);
  }
  
  const { mode } = useSelector((state) => state.darkMode)
  
  const [seed, setSeed] = useState(null)

const myProfile = useSelector(state => state.appConfigReduser.myProfile)
  const content = (
    <div>
    <p className='hover-link edit-delete' onClick={deleteComment}><ImBin2/> <p> Delete</p></p>
    </div>
    );

  return (
    <div className='AllComments'>
      <div className='comment-details'>
        <Avatar  src={comments?.commentsImage?.url}/>
        <h3 className='commentsName'>{comments?.commentsName}</h3>
        <h5 className='comment'>{comments?.comment}</h5>

      </div>
      {myProfile?.name === comments?.commentsName ? <div style={{ whiteSpace: 'nowrap' }}>
<Popover key={seed}  className='more-icon' placement="top" content={content} trigger="click">
<Button style={{border: 'none', outline:'none', backgroundColor: mode? '#263238' : 'white'}}>< BsThreeDotsVertical style={{color: mode?  'white' : 'black'}}/></Button>
</Popover>

</div> : ''}
      
    </div>
  )
}

export default Comments