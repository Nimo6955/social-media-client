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


function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route element={<RequireUser />}>
            <Route path='/' element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />


        </Routes>

      </Router>

    </>
  );
}

export default App;
