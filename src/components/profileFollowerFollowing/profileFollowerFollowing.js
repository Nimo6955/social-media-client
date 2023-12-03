import React from 'react'
import { useNavigate } from 'react-router-dom'
import  Avatar  from '../../components/Avatar/avatar'


function ProfileFollowerFollowing({user}) {

  const navigate = useNavigate()
  function idk(){
    navigate(`/profile/${user._id}`)
    // window.location.reload()
  }

  return (
    <div className='Follower'>
    <div className="user-info" onClick={idk}>
    <Avatar src={user?.avatar?.url}/>
    <h4 className="name">{user?.name}</h4>
    </div>
</div>
  )
}

export default ProfileFollowerFollowing