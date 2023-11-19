import React, { useEffect, useState } from 'react'
import  Avatar  from '../../components/Avatar/avatar'
import './signupSuggestions.scss'
import { useDispatch, useSelector } from 'react-redux'
import { folloAndUnfollowUser, getFeedData } from '../../redux/slices/feedSlice'


function SignupSuggestions({user}) {
    const { mode } = useSelector((state) => state.darkMode)


  const dispatch = useDispatch()

  const feedData = useSelector(state => state.feedDataReducer.feedData)

  const [isfollowing, setIsfollowing] = useState();
  useEffect(() => {
    setIsfollowing(feedData?.followings?.find(item => item._id === user._id))
  },[dispatch])

  function handleUserFollow(e){
    // dispatch(getFeedData())
    dispatch(folloAndUnfollowUser({
      userIdToFollow: user._id
    }));
    console.log( 'signup',user._id)
    
  }
  return (
    <div className='signupSuggestions'>
        <div className="user-info">
        <Avatar src={user?.avatar?.url}/>

        <h4 className="name">{user?.name}</h4>

        </div>
        <h5 onClick={handleUserFollow} id="follow-link" className={isfollowing ? "hover-link follow-link" : 'btn-primary1'}>{isfollowing ? 'Unfollow' : 'follow'}</h5>
    </div>
  )
}

export default SignupSuggestions