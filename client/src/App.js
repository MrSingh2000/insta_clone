import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/registration/Login';
import Signup from './components/registration/Signup';
import MyProfile from './components/profile/MyProfile';
import { useSelector } from 'react-redux/es/exports';
import OtherProfile from './components/profile/OtherProfile';
import FollowList from './components/profile/FollowList';
import Error from './components/Error';
import { useGetUserDetails } from './components/common/functions';
import Loader from './components/common/Loader';
import Chat from './components/Chat';
import { RequireAuth } from './components/registration/RequireAuth';
import MobileSearch from './components/profile/MobileSearch';

function App() {
  let authToken = useSelector((store) => store.authToken.value);

  let [getUserDetails] = useGetUserDetails();
  // let [updateChat] = useChat();

  let loading = useSelector((store) => store.loading.value);

  useEffect(() => {
    // when logged in and authToken exists, get the user's posts 
    if (authToken || localStorage.getItem("authToken")) {
      console.log("getting user detials");
      getUserDetails("admin");
    }
    // eslint-disable-next-line
  }, []);



  return loading ? <Loader /> : (
    <BrowserRouter>
      <Routes>
        {/* Nested Routing */}
        <Route path="/" element={<RequireAuth />}>
          <Route path="" element={<Home />} />

          <Route path="myprofile">

            <Route path="" element={<MyProfile />} />
            {/* type = follower or following */}
            <Route path=":type" element={<FollowList />} />
            <Route path="chat">
              <Route path="" element={<Chat />} />
            </Route>

          </Route>
          <Route path="search" element={<MobileSearch />} />

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
