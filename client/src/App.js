import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/registration/Login';
import Signup from './components/registration/Signup';
import MyProfile from './components/MyProfile';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { updatePosts } from './components/state/reducers/userPostReducer';
import OtherProfile from './components/OtherProfile';
import { updateUserDetails } from './components/state/reducers/userDetailsReducer';

function App() {
  let dispatch = useDispatch();
  // when logged in and authToken exists, get the user's posts 
  const getUserDetails = async () => {
    // getting user Details
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_HOST}/api/update/get_details`,
      headers: {
        'authToken': process.env.REACT_APP_AUTH_TOKEN
      }
    }).then((res) => {
      dispatch(updateUserDetails(res.data));
    });

    // getting user posts
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_HOST}/api/post/get_posts`,
      headers: {
        'authToken': process.env.REACT_APP_AUTH_TOKEN
      }
    }).then((res) => {
      dispatch(updatePosts(res.data.posts));
    });
  }

  useEffect(() => {
    getUserDetails();
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/user/:userId" element={<OtherProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
