import React, { useEffect, useState } from 'react'
import  Avatar  from '../../components/Avatar/avatar'
import './follower.scss'
import { useDispatch, useSelector } from 'react-redux'
import { folloAndUnfollowUser, getFeedData } from '../../redux/slices/feedSlice'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'



function Follower({user}) {

  const { mode } = useSelector((state) => state.darkMode)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const feedData = useSelector(state => state.feedDataReducer.feedData)

  const [isfollowing, setIsfollowing] = useState();

  useEffect(() => {
    setIsfollowing(feedData?.followings?.find(item => item._id === user._id))
  },[dispatch])

  function handleUserFollow() {
    dispatch(folloAndUnfollowUser({
      userIdToFollow: user._id
    }))
    dispatch(getFeedData());
    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: `You are now following ${user?.name}`
    }))
  }
  return (
    <div className='Follower'>
        <div className="user-info" onClick={() => navigate(`/profile/${user._id}`)}>
        <Avatar src={user?.avatar?.url}/>
        <h4 className="name" style={{color: mode ? 'white' : 'black'}}>{user?.name}</h4>
        </div>
        <h5 onClick={handleUserFollow} className={isfollowing ? "hover-link follow-link" : 'btn-primary1'}>{isfollowing ? 'Unfollow' : 'follow'}</h5>
    </div>
  )
}

export default Follower