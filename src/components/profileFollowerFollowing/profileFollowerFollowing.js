import React from 'react'
import { useNavigate } from 'react-router-dom'
import  Avatar  from '../../components/Avatar/avatar'


function ProfileFollowerFollowing({user}) {

  const navigate = useNavigate()

  return (
    <div className='Follower'>
    <div className="user-info" onClick={() => navigate(`/profile/${user._id}`)}>
    <Avatar src={user?.avatar?.url}/>
    <h4 className="name">{user?.name}</h4>
    </div>
</div>
  )
}

export default ProfileFollowerFollowing