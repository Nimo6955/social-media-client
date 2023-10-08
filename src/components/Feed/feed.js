import React, { useEffect, useState } from 'react'
import './feed.scss'
import Post from '../Post/post'
import Follower from '../follower/follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'
import SideNavbar from '../sideNavbar/sideNavbar'



function Feed() {



    const { mode } = useSelector((state) => state.darkMode)
    

  const dispatch = useDispatch()
  const feedData = useSelector(state => state.feedDataReducer.feedData)

  useEffect(() => {
    dispatch(getFeedData())
  },[dispatch])


 
  return (
    <div className='big-Feed' style={{backgroundColor: mode ? 'black' : 'white'}} >
      <SideNavbar/>
    <div className='Feed'>
        <div  className="container">
            <div className="left-part">
              {feedData?.posts?.map((post) => <Post key={post._id} post={post}/>)}
            </div>
            <div className="right-part">
              <div className="Suggestions">
                <h3 className="title" style={{color: mode ? '' : 'black'}}>Suggestios for you</h3>
                {feedData?.shuffledSuggestions?.map(user => <Follower key={user._id} user={user}/>)}
              </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Feed