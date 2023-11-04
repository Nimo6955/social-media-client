import React, { useEffect, useState } from 'react'
import './feed.scss'
import Post from '../Post/post'
import Follower from '../follower/follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'
import SideNavbar from '../sideNavbar/sideNavbar'
import { Modal } from 'antd';
import { BsSearch } from 'react-icons/bs'
import ProfileFollowerFollowing from '../profileFollowerFollowing/profileFollowerFollowing'
import FooterNavbar from '../footerNavbar/footerNavbar'



function Feed() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
      setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const { mode } = useSelector((state) => state.darkMode)
    
    const [search, setSearch] = useState('')
    const [results , setResults] = useState([])
  const dispatch = useDispatch()
  const feedData = useSelector(state => state.feedDataReducer.feedData)

  useEffect(() => {
    dispatch(getFeedData())
  },[dispatch])

  function fetchData(e){
    const Data = feedData?.AllUsers
    // const newData = Data.json()
    const result =
    Data.filter((user) => {
          return e && user.name?.toLowerCase().includes(e)
      });
      setResults(result)
  }

 function handleChange(e){
    setSearch(e)
    fetchData(e)
 }
 
  return (
    <div className='big-Feed' style={{backgroundColor: mode ? 'black' : 'white'}} >
      <SideNavbar />
    <div className='Feed'>
        <div  className="container">
            <div className="left-part">
              <h5>{feedData?.posts?.length === 0 && 'Follow people to see there posts'}</h5>
              {feedData?.posts?.map((post) => <Post key={post._id} post={post}/>)}
            </div>
            <div className="right-part">
              <div className="Suggestions">
                <div className="title" style={{color: mode ? '' : 'black'}}>
                   <p> Suggestions for you </p> 
                   <div id={`${mode ? 'searchButton' : ''}`}  className='searchButton' onClick={showModal}>
                   <BsSearch  style={{color: mode ? 'white' : 'black'}} className='hover-link searchIcon' />
                   <div className='animation'></div>
                   </div>
                </div>
                
                {feedData?.shuffledSuggestions?.map(user => <Follower key={user._id} user={user}/>)}
              </div>
            </div>
        </div>
    </div>
    <Modal okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input className='searchInput' type="text" value={search}  onChange={(e) => handleChange(e.target.value)} placeholder='Search User...'/>
        <div className='searchBox' style={{height: "250px", overflowY: 'scroll'}}>

        <h4>{results.map((result, user) => <ProfileFollowerFollowing key={user._id}  user={result}/>)}</h4>
        </div>
      </Modal>
      <div className="mobileNavbar">
      <FooterNavbar/>
      </div>
    </div>
  )
}

export default Feed