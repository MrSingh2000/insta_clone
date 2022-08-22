import React from 'react';
import logo from '../static/login/login_logo.png';
import { BsThreeDots } from 'react-icons/bs';
import mainProfile from "../static/home/mainpp.jpg";
import pp1 from "../static/home/pp1.jpg";
import pp2 from "../static/home/pp2.jpg";
import pp3 from "../static/home/pp3.jpg";
import pp4 from "../static/home/pp4.jpg";
import pp5 from "../static/home/pp5.jpg";
import pp6 from "../static/home/pp6.jpg";
import pp7 from "../static/home/pp7.jpg";
import pp8 from "../static/home/pp8.jpg";
import pp9 from "../static/home/pp9.jpg";
import post1 from "../static/home/sample3.jpg";
import post2 from "../static/home/sample1.jpg";
import post3 from "../static/home/sample2.jpg";
import post4 from "../static/home/sample3.2.jpg";
import post5 from "../static/home/sample3.1.jpg";

import "../styles/custom.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { set, remove } from './state/reducers/authTokenReducer';
import { useEffect, useState } from 'react';
import { DesktopNav, MobileNav } from "./Navbar";
import { update } from './state/reducers/userPostReducer';
import axios from 'axios';
import { useAdminChat } from './common/functions';
import { socket } from '../socket';
import { FcLike } from "react-icons/fc";
import { BiComment } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";

function Home() {
  // const dps = [pp8, pp2, pp3, pp4, pp5, pp6, pp7, pp1, pp9];
  const dps = [{ pic: mainProfile, name: "mr_singh2000" }, { pic: pp2, name: "sukhman..." }, { pic: pp8, name: "ahsaassy_" }];

  const posts = [
    {
      post: post1,
      pic: pp8,
      name: "ahsaassy_"
    }, {
      post: post2,
      pic: pp1,
      name: "punjabi_tadka"
    }, {
      post: post3,
      pic: pp1,
      name: "punjabi_tadka"
    }, {
      post: post4,
      pic: pp8,
      name: "ahsaassy_"
    }, {
      post: post5,
      pic: pp8,
      name: "ahsaassy_"
    }];
  const dispatch = useDispatch();
  // useAdminChat()
  // profile menu dropdown
  const [profileDrop, setProfileDrop] = useState(false);


  const authToken = useSelector(state => state.authToken.value);

  function toggleModal() {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');
  }


  return (

    <div className="flex flex-col items-center">
      {/* <button onClick={() => dispatch(set({value: "this is new"}))}>Click me</button> */}
      <DesktopNav />
      {/* Main Content */}
      <div className="flex mt-20">
        <div>
          {/* Stories */}
          <div className="px-2">
            {/* Stories block */}
            {/* console.log(index); */}
            <div className="px-2 rounded-lg border-2 mt-4 p-2 flex overflow-auto">
              {/* Story circle */}
              {dps.map((pic, index) => {
                return (

                  <div className="w-fit mx-2" key={index}>
                    <div className="w-fit rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 p-0.5">
                      <div className="w-fit rounded-full bg-white">
                        <img src={pic.pic} alt="profile" className="rounded-full border-transparent border-4 w-16" />
                      </div>
                    </div>
                    {/* username */}
                    <p className="text-xs text-center">{pic.name}</p>
                  </div>

                )
              })}
            </div>
          </div>
          {/* Posts */}
          <div className="px-2">
            {/* post block */}
            {posts.map((item, index) => {
              return (
                <div key={index} className="border-2 border-gray-200 rounded-lg mt-4">
                  {/* profile username block */}
                  <div className="flex justify-between items-center p-2">
                    <div className="flex">
                      <img className="rounded-full h-8 mr-2" src={item.pic} alt="profile_pic" />
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <BsThreeDots onClick={(event) => {
                      event.preventDefault();
                      toggleModal();
                    }} className="mr-1 cursor-pointer" />
                    {/* menu prompt (Modal) */}
                    <div className="bg-gray-200 flex items-center justify-center absolute z-10">
                      <div className="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
                        <div onClick={toggleModal} className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                          <div className="modal-content py-2 text-left px-6">
                            <div className="flex flex-col justify-between items-center pb-3">
                              <p className="border-b-2 border-grey-200 w-full text-center py-3 text-red-500 font-medium">Report</p>
                              <p className="border-b-2 border-grey-200 w-full text-center py-3 text-red-500 font-medium">Unfollow</p>
                              <p className="border-b-2 border-grey-200 w-full text-center py-3">Go to post</p>
                              <p className="border-b-2 border-grey-200 w-full text-center py-3">Share to...</p>
                              <p className="border-b-2 border-grey-200 w-full text-center py-3">Copy Link</p>
                              <p className="border-b-2 border-grey-200 w-full text-center py-3">Embed</p>
                              <p className="w-full text-center">Cancel</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* post block */}
                  <div>
                    <img src={item.post} alt="post_1" style={{ maxWidth: '587.5px', width: '100%' }} />
                  </div>
                  <div className="flex justify-between mx-4 items-center">
                    <div>
                      <button>
                        <FcLike size={40}/>
                      </button>
                      <button>
                        <BiComment className="ml-4" size={35} />
                      </button>
                    </div>
                    <div>
                      <button>
                        <BsBookmark size={35} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Suggestion Box */}
        <div className="px-2 md:block hidden">
          <div className="px-2 mt-4 p-2">
            {/* user profile */}
            <div className="flex text-sm w-80">
              <img src={mainProfile} alt="main" className="w-16 rounded-full" />
              <div className="p-2">
                <p className="font-semibold">mr_singh2000</p>
                <p className="font-light">ਅੰਸ਼ੂਮਨ ਸਿੰਘ</p>
              </div>
            </div>
            {/* suggestions */}
            <p className="py-2 opacity-50 font-semibold">Suggestions for you</p>
            <div className="flex text-xs w-72 justify-between items-center">
              <div className="flex ">
                <img src={mainProfile} alt="main" className="w-10 mt-1 h-10 rounded-full" />
                <div className="p-2">
                  <p className="font-semibold">mr_singh2000</p>
                  <p className="font-light">ਅੰਸ਼ੂਮਨ ਸਿੰਘ</p>
                </div>
              </div>
              <a href="#" className="font-semibold text-blue-600">Follow</a>
            </div>

            <div className="flex text-xs w-72 justify-between items-center">
              <div className="flex ">
                <img src={mainProfile} alt="main" className="w-10 mt-1 h-10 rounded-full" />
                <div className="p-2">
                  <p className="font-semibold">mr_singh2000</p>
                  <p className="font-light">New to insta</p>
                </div>
              </div>
              <a href="#" className="font-semibold text-blue-600">Follow</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <MobileNav />
    </div>
  )
}

export default Home