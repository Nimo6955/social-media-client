import React from 'react'
import  Avatar  from '../../components/Avatar/avatar'
import './follower.scss'



function follower() {
  return (
    <div className='Follower'>
        <div className="user-info">
        <Avatar/>
        <h4 className="name">Nomesh</h4>
        </div>
        <h5 className="hover-link follow-link">follow</h5>
    </div>
  )
}

export default follower