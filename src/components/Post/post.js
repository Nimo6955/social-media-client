import React from 'react'
import './post.scss'
import  Avatar  from '../../components/Avatar/avatar'
import CatImg from '../../assets/cat.jpg'
import {AiOutlineHeart} from 'react-icons/ai'



function post({post}) {
  return (
    <div className='Post'>
        <div className="heading">
            <Avatar/>
            <h4>Sukhpal Singh</h4>
        </div>
        <div className="content">
            <img src={CatImg} alt="CatImg" />
        </div>
        <div className="footer">
            <div className="likes">
            <AiOutlineHeart className='Icon'/>
            <h4> 10 likes</h4>
        </div>
        <p className='caption'>this is just a cat Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, magnam quas! Quasi, odit dolorum ullam quo velit incidunt enim ut.</p>
        <h5 className='caption-time'>3 hours ago</h5>
        </div>

    </div>
  )
}

export default post