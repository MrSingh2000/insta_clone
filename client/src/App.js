import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/registration/Login';
import Signup from './components/registration/Signup';
import MyProfile from './components/profile/MyProfile';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { updatePosts } from './components/state/reducers/userPostReducer';
import OtherProfile from './components/profile/OtherProfile';
import { updateUserDetails } from './components/state/reducers/userDetailsReducer';
import FollowList from './components/profile/FollowList';
import Error from './components/Error';
import { useAdminChat, useGetUserDetails } from './components/common/functions';
import Loader from './components/common/Loader';
import { connectToSocketServer } from './socket';
import Chat from './components/Chat';

function App() {
  let dispatch = useDispatch();
  let [getUserDetails] = useGetUserDetails();
  useAdminChat();

  let loading = useSelector((store) => store.loading.value);
  let adminDetails = useSelector((store) => store.userDetails.value);

  useEffect(() => {
    // when logged in and authToken exists, get the user's posts 
    getUserDetails("admin");
  }, []);




  return loading ? <Loader /> : (
    <BrowserRouter>
      <Routes>
        {/* Nested Routing */}
        <Route path="/" >
          <Route path="" element={<Home />} />

          <Route path="myprofile">

            <Route path="" element={<MyProfile />} />
            {/* type = follower or following */}
            <Route path=":type" element={<FollowList />} />
            <Route path="chat">
              <Route path="" element={<Chat />} />
            </Route>

          </Route>

          <Route path="user/:userId" element={<OtherProfile />} />

        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
