import React, { useState, useEffect } from 'react';
import logo from '../static/login/login_logo.png';
import mainProfile from "../static/home/mainpp.jpg";
import { RiSettings3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DesktopNav, MobileNav } from "./Navbar";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function MyProfile() {
  const [profileDrop, setProfileDrop] = useState(false);
  let dispatch = useDispatch();
  let authToken = useSelector((store) => store.authToken.value);
  const posts = useSelector((state) => state.userPost.value);

  return (
    <>
      <div className="flex flex-col items-center">

        {/* Desktop Navbar */}
        <DesktopNav />

        {/* Main content */}
        <div className="flex flex-col justify-start w-full lg:w-2/3 mt-6">
          <div className="flex">
            <div className="sm:p-16">
              <img className="rounded-full" src={mainProfile} alt="pp" />
            </div>
            <div>
              {/* username block */}
              <div className="flex justify-between items-center ">
                <p className="m-2 font-thin text-3xl">mr_singh2000</p>
                <button className="m-2 border-2 p-1 rounded-lg font-medium sm:block hidden">Edit Profile</button>
                <RiSettings3Line className="m-2" size="25px" />
              </div>
              <div className="w-full flex justify-center">
                <button className="border-2 p-1 rounded-lg font-medium sm:hidden block w-4/5">Edit Profile</button>
              </div>
              {/* followers block */}
              <div className="flex justify-between items-center mt-2 m-2">
                <p><b>46</b> posts</p>
                <p><b>1,696</b> followers</p>
                <p><b>677</b> following</p>
              </div>
              {/* bio block */}
              <div className="m-2">
                <p className="font-bold">User's real name</p>
                <p>
                  ❄️ ਨਿਰਭਓ ਨਿਰਵੈਰ ❄️ <br />
                  💪 ਹਰ ਮੈਦਾਨ ਫਤਿਹ 💪<br />
                  #2percent <br />
                  🎓 DCRUST
                </p>
              </div>
            </div>
          </div>
          {/* Posts block */}
          <hr className="font-bold" style={{ color: 'black' }} />
          <div className="grid grid-cols-3 gap-4 my-5">
            {posts.map((postUrl) => {
              return (
                <div key={postUrl} className="flex justify-center bg-slate-200">
                  <img src={postUrl} alt="post" className="max-h-60" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <MobileNav />
      </div>
    </>
  )
}

export default MyProfile