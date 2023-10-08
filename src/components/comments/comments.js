import React from 'react'
import  Avatar  from '../../components/Avatar/avatar'

function Comments({comments}) {

  return (
    <div>
        <Avatar  src={comments?.commentsImage?.url}/>
        <h3>{comments?.commentsName}</h3>
        <h5>{comments?.comment}</h5>
    </div>
  )
}

export default Comments