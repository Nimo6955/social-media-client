import React from 'react'
import './feed.scss'
import Post from '../Post/post'
import Follower from '../follower/follower'


function feed() {
  return (
    <div className='Feed'>
        <div className="container">
            <div className="left-part">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
            <div className="right-part">
              <div className="following">
                <h3 className="title">You are following</h3>
                <Follower/>
                <Follower/>
                <Follower/>
                <Follower/>
              </div>
              <div className="Suggestions">
                <h3 className="title">Suggestios for you</h3>
                <Follower/>
                <Follower/>
                <Follower/>
                <Follower/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default feed