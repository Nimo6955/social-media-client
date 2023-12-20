import React, { useEffect, useState } from 'react'
import './footerNavbar.scss'
import {BsBookmark, BsFillMoonFill, BsFillSunFill, BsSearch} from 'react-icons/bs'
import {VscThreeBars} from 'react-icons/vsc'
import {MdOutlineLogout} from 'react-icons/md'
import { FaHouse } from 'react-icons/fa6'
import {FaRegUser} from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Popover } from 'antd';
import ProfileFollowerFollowing from '../profileFollowerFollowing/profileFollowerFollowing'
import { getFeedData } from '../../redux/slices/feedSlice'
import BookmarkPost from '../bookmarkpost/bookmarkPost'
import { toggleDarkMode } from '../../redux/slices/darkModeSlice'
import { axiosClient } from '../../Utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../Utils/localStoregeManager'
import { setLoading } from '../../redux/slices/appConfigSlice'



function FooterNavbar() {

    const feedData = useSelector(state => state.feedDataReducer.feedData)
    const myProfile = useSelector(state => state.appConfigReduser.myProfile)
    const { mode } = useSelector((state) => state.darkMode)

    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const content = (
        <div>
        <p className='hover-link darkMode-button' onClick={() => dispatch(toggleDarkMode())}>{mode ? <BsFillSunFill/> :  <BsFillMoonFill/>}<p>{mode? 'Light Mode' : 'Dark Mode'}</p></p>
        <hr style={{marginBlock:'8px'}} />
        <p className='logOut-button hover-link' onClick={handleLogOut}> <MdOutlineLogout /> <p> log Out</p></p>
        </div>
        );

    


  const [search, setSearch] = useState('')
  const [results , setResults] = useState([])
  const [isSearchOpen, setSearchOpen] = useState(false);


   const showSearchModal = () => {
    dispatch(getFeedData())
    setSearchOpen(true);
  }

  const handleSearchOk = () => {
    setSearchOpen(false);
  };
  const handleSearchCancel = () => {
    setSearchOpen(false);
  };
  
  function fetchData(e){
    const Data = feedData?.AllUsers
    // const newData = Data.json()
    const result =
    Data?.filter((user) => {
          return e && user?.name?.includes(e)
      });
      setResults(result)
  }

 function handleChange(e){
    setSearch(e)
    fetchData(e)
 }
 const location = useLocation()
//  console.log(location.pathname);

  return (
    <div className='FooterNavbar'>
        <ul className="FooterNavbarBox" style={{backgroundColor: mode ? 'black' : ''}}>
            <li className='hover-link' onClick={() =>navigate('/')}><FaHouse id='home' style={{color: location.pathname === '/' ? '#ee7837' : mode ? 'white' : 'black'}}/></li>
            <li className='hover-link'  onClick={() =>navigate(`/profile/${myProfile?._id}`)}><FaRegUser id='profile' style={{color: location.pathname === `/profile/${myProfile?._id}` ? '#ee7837' : mode ? 'white' : 'black'}}/></li>
            <li className='hover-link' id='searchBtnM' onClick={showSearchModal}><BsSearch  style={{color: mode ? 'white' : 'black'}}/></li>
            <li className='hover-link' id='bookmarkBtnM' onClick={showModal}><BsBookmark  style={{color: mode ? 'white' : 'black'}}/></li>
            <div style={{ whiteSpace: 'nowrap' }} id='more-IconM'>
<Popover  className='more-icon' placement="bottom" content={content} trigger="click">
<Button style={{border: 'none', outline:'none', backgroundColor: mode ? 'black' : 'white', padding: 'none'}}><VscThreeBars style={{color: mode ? 'white' : 'black'}}/></Button>
</Popover>

</div>
        </ul>

        <Modal okButtonProps={{ style: { backgroundColor: '#ee7837', borderRadius: '30px', color: 'black' }}} cancelButtonProps={{style: {display: 'none'}}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <h2>{feedData?.bookmarks?.length === 0 && 'No bookmarks to display'}</h2>
      <h2>{feedData?.bookmarks?.length === 0 || 'Your Bookmarks'}</h2>
      <div className='book-post' style={{ overflowY: 'scroll',height: feedData?.bookmarks?.length === 0 ? '100px' : '70vh',display: 'flex',marginInline: 'auto',flexDirection: 'column',alignItems: 'center'}} >
    {feedData?.bookmarks?.map((post) => <BookmarkPost key={post._id} post={post}/>)}
      </div>
        
      </Modal>
        <Modal okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{style: {display: 'none'}}} open={isSearchOpen} onOk={handleSearchOk} onCancel={handleSearchCancel}>
        <input className='searchInput' type="text" value={search}  onChange={(e) => handleChange(e.target.value)} placeholder='Search User...'/>
        <div className='searchBox' style={{height: "250px", overflowY: 'scroll'}}>

        <h4>{results?.map((result, user) => <ProfileFollowerFollowing key={user._id}  user={result}/>)}</h4>
        </div>
      </Modal>
    </div>
  )
}

export default FooterNavbar