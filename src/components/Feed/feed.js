import React, { useEffect } from 'react'
import './feed.scss'
import Post from '../Post/post'
import Follower from '../follower/follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'
import { BsFillHouseFill } from 'react-icons/bs'
import {BiUserCircle} from 'react-icons/bi'
import {IoReorderThree} from 'react-icons/io5'
import {MdOutlineLogout} from 'react-icons/md'
import { setLoading } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../Utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../Utils/localStoregeManager'
import { useNavigate } from 'react-router-dom'
import { Button, Popover } from 'antd';

function Feed() {


  const content = (
    <div>
    <p>Dark Mode</p>
    <hr style={{marginBlock:'8px'}} />
    <p className='logOut-button hover-link' onClick={handleLogOut}> <MdOutlineLogout /> <p> log Out</p></p>
    </div>
    );
    

  const dispatch = useDispatch()
  const feedData = useSelector(state => state.feedDataReducer.feedData)

  useEffect(() => {
    dispatch(getFeedData())
  },[dispatch])

  const navigate = useNavigate()

  
  async function handleLogOut(){
    try {
      dispatch(setLoading(true))
      await axiosClient.post('auth/logout')  
      removeItem(KEY_ACCESS_TOKEN)
      navigate('/login')
      dispatch(setLoading(false))
    } catch (e) {
      
    }
  }
  
  const myProfile = useSelector(state => state.appConfigReduser.myProfile)

 
  return (
    <div className='big-Feed'>
      <div className="sideNavbar">
        <div className='side-bar-routes'>

        <button className="home hover-link  btn-primary3"> <BsFillHouseFill style={{fontSize: '1rem', marginRight: '7px'}}/> <p> home</p></button>

        <button className="profile hover-link  btn-primary2" onClick={() =>navigate(`/profile/${myProfile?._id}`)}> <BiUserCircle style={{fontSize: '1rem', marginRight: '7px'}}/> <p> profile</p></button>
        </div>
        <div style={{ whiteSpace: 'nowrap' }}>
<Popover  className='more-icon' placement="top" content={content} trigger="click">
<Button style={{border: 'none', outline:'none', backgroundColor:'black'}}><IoReorderThree style={{fontSize: '2rem', marginRight: '7px'}}/> <p >MORE</p></Button>
</Popover>

</div>
      </div>
    <div className='Feed'>
        <div  className="container">
            <div className="left-part">
              {feedData?.posts?.map(post => <Post key={post._id} post={post}/>)}
            </div>
            <div className="right-part">
              <div className="following">
                <h3 className="title">You are following</h3>
                {feedData?.followings?.map(user => <Follower key={user._id} user={user}/>)}
              </div>
              <div className="Suggestions">
                <h3 className="title">Suggestios for you</h3>
                {feedData?.suggestions?.map(user => <Follower key={user._id} user={user}/>)}
              </div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Feed