import RequireUser from "./components/requireUser";
import Home from "./pages/Home/Home";
import Login from "./pages/log in/login";
import Signup from "./pages/sign up/signup";
import Feed from "./components/Feed/feed";
import Profile from "./components/Profile/profile";
import UpdateProfile from "./components/updateProfile/updateProfile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar'
import OnlyIfNotLoggedIn from "./components/onlyIfNotLoggedIn";
import toast, { Toaster } from 'react-hot-toast';
import UserInfoSelect from "./pages/userInfoSelect/userInfoSelect";


export const TOAST_SUCCESS = 'toast_success'
export const TOAST_FAILURE = 'toast_failure'
function App() {

  const isLoading = useSelector(state => state.appConfigReduser.isLoading);
  const toastData = useSelector(state => state.appConfigReduser.toastData);
  const loadingRef = useRef(null)

  useEffect(() => {
    if(isLoading){
      loadingRef.current?.continuousStart()
    }else{
      
      loadingRef.current?.complete()
    }
    
  }, [isLoading])

  useEffect(() => {
   switch (toastData.type) {
    case TOAST_SUCCESS:
      toast.success(toastData.message)
      break;
      case TOAST_FAILURE:
        toast.error(toastData.message)
        break;
     ;
   }
  }, [toastData])
  
  
  return (
    <>
      {/* <Router> */}
        <LoadingBar height={3} color='#f11946' ref={loadingRef} />
        <div><Toaster/></div>
        <Routes>


          <Route element={<RequireUser />}>
            <Route path='/' element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
          </Route>
          <Route element= {<OnlyIfNotLoggedIn/>}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/userInfoSelect" element={<UserInfoSelect/>}/>
          </Route>

        </Routes>

      {/* </Router> */}

    </>
  );
}

export default App;
