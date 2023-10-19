import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaHouse } from 'react-icons/fa6'
import {FaRegUser} from 'react-icons/fa'
import {BsBookmark, BsFillMoonFill, BsFillSunFill, BsSearch} from 'react-icons/bs'
import {IoReorderThree} from 'react-icons/io5'
import {MdOutlineLogout} from 'react-icons/md'
import { Button, Popover } from 'antd';
import BookmarkPost from '../bookmarkpost/bookmarkPost'
import { toggleDarkMode } from '../../redux/slices/darkModeSlice'
import { useNavigate } from 'react-router-dom'
import { setLoading } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../Utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../Utils/localStoregeManager'
import { Modal } from 'antd';
import './sideNavbar.scss'
import { getFeedData } from '../../redux/slices/feedSlice'
import ProfileFollowerFollowing from '../profileFollowerFollowing/profileFollowerFollowing'



function SideNavbar() {
  const feedData = useSelector(state => state.feedDataReducer.feedData)

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
    const { mode } = useSelector((state) => state.darkMode)
  const dispatch = useDispatch()


  const content = (
    <div>
    <p className='hover-link darkMode-button' onClick={() => dispatch(toggleDarkMode())}>{mode ? <BsFillSunFill/> :  <BsFillMoonFill/>}<p>{mode? 'Light Mode' : 'Dark Mode'}</p></p>
    <hr style={{marginBlock:'8px'}} />
    <p className='logOut-button hover-link' onClick={handleLogOut}> <MdOutlineLogout /> <p> log Out</p></p>
    </div>
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    dispatch(getFeedData())
  };

  const handleOk = () => {
    setIsModalOpen(false);
  
};

const handleCancel = () => {
    setIsModalOpen(false);
    
  }
  const myProfile = useSelector(state => state.appConfigReduser.myProfile)

  const [search, setSearch] = useState('')
  const [results , setResults] = useState([])
  const [isSearchOpen, setSearchOpen] = useState(false);


   const showSearchModal = () => {
    setSearchOpen(true);
  }

  const handleSearchOk = () => {
    setSearchOpen(false);
  };
  const handleSearchCancel = () => {
    setSearchOpen(false);
  };
  function fetchData(e){
    const Data = feedData?.suggestions
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
    <div className="sideNavbar">
        <div className='side-bar-routes'>

        <button id={`${mode ? '' : 'active-btn-primary3'}`} className="home hover-link  btn-primary3"  onClick={() =>navigate('/')}> <FaHouse style={{fontSize: '1rem', marginRight: '7px', height: mode ? '' : '20px'}}/> <p> Home</p></button>

        <button id={`${mode ? '' : 'active-btn-primary2'}`} className="profile hover-link  btn-primary2" onClick={() =>navigate(`/profile/${myProfile?._id}`)}> <FaRegUser style={{fontSize: '1rem', marginRight: '7px', height: mode ? '' : '20px'}}/> <p> Profile</p></button>
        <button id={`${mode ? '' : 'active-btn-primary4'}`} className='btn-primary1 searchButton'onClick={showSearchModal}><BsSearch  style={{fontSize: '1rem', marginRight: '7px'}} className='hover-link searchIcon' /></button> 
        <button id={`${mode ? '' : 'active-btn-primary1'}`} onClick={showModal} className="profile hover-link btn-primary1" > <BsBookmark style={{fontSize: '1rem', marginRight: '7px', height: mode ? '' : '20px'}}/> <p> Bookmark</p></button>

        </div>
        <div style={{ whiteSpace: 'nowrap' }}>
<Popover  className='more-icon' placement="bottom" content={content} trigger="click">
<Button style={{border: 'none', outline:'none', backgroundColor: mode ? 'black' : 'white  '}}><IoReorderThree style={{fontSize: '2rem', marginRight: '7px',color: mode ? 'white' : 'black'}}/> <p style={{color: mode ? 'white' : 'black'}}>MORE</p></Button>
</Popover>

</div>
<Modal okButtonProps={{ style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' }}}  style={{height: '90vh', width:'1000px'}}  cancelButtonProps={{style: {display: 'none'}}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <h2>{feedData?.bookmarks?.length === 0 || 'Your Bookmarks'}</h2>
      <h2>{feedData?.bookmarks?.length === 0 && 'No bookmarks to display'}</h2>
      <div className='book-post' style={{ overflowY: 'scroll'}} >
    {feedData?.bookmarks?.map((post) => <BookmarkPost key={post._id} post={post}/>)}
      </div>
        
      </Modal>
      <Modal okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isSearchOpen} onOk={handleSearchOk} onCancel={handleSearchCancel}>
        <input className='searchInput' type="text" value={search}  onChange={(e) => handleChange(e.target.value)} placeholder='Search User...'/>
        <div className='searchBox' style={{height: "250px", overflowY: 'scroll'}}>

        <h4>{results.map((result, user) => <ProfileFollowerFollowing key={user._id}  user={result}/>)}</h4>
        </div>
      </Modal>
      </div>
  )
}

export default SideNavbar