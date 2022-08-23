import React, {  useRef } from 'react';
import nopp from '../../static/home/no_pp.jpg';
import { RiSettings3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DesktopNav, MobileNav } from "../Navbar";
import { useSelector } from 'react-redux';
import { BsCameraFill } from 'react-icons/bs';
import { useUploadFile } from '../common/functions';

function MyProfile() {
  let [uploadFile] =  useUploadFile();

  let adminDetails = useSelector((store) => store.userDetails.value);
  const posts = useSelector((state) => state.userPost.value);

  const inputRef = useRef(null);
  const handlePic = () => {
    inputRef.current.click();
  }

  return (
    <>
      <div className="flex flex-col items-center">

        {/* Desktop Navbar */}
        <DesktopNav />

        {/* Main content */}
        <div className="flex flex-col justify-start w-full lg:w-2/3 sm:mt-24 mt-16">
          <div className="flex">
            <div onClick={handlePic} className="sm:p-16 flex justify-center items-center">
              <img  className="hover:z-0 z-10 rounded-full profilePic max-h-36" src={adminDetails.pic ? adminDetails.pic : nopp} alt="pp" />
              <div className="flex justify-center items-center max-h-36 h-full max-w-[9rem] w-full bg-gray-200 opacity-50 rounded-full absolute">
                <BsCameraFill size={50} className="" />
              </div>
              {/* <img src={nopp} className="rounded-full absolute max-h-36 profilePicFloat" alt="none" /> */}
              <input onChange={(e) => {
                uploadFile(e.target.files[0], "pic");
              }} ref={inputRef} type="file" className="hidden" />
            </div>
            <div>
              {/* username block */}
              <div className="flex justify-between items-center ">
                <p className="m-2 font-thin text-3xl">{adminDetails.username}</p>
                <button className="m-2 border-2 p-1 rounded-lg font-medium sm:block hidden">Edit Profile</button>
                <RiSettings3Line className="m-2" size="25px" />
              </div>
              <div className="w-full flex justify-center">
                <button className="border-2 p-1 rounded-lg font-medium sm:hidden block w-4/5">Edit Profile</button>
              </div>
              {/* followers block */}
              <div className="flex justify-between items-center mt-2 m-2 text-sm sm:text-base">
                <p className="mr-2"><b>{adminDetails.posts.length}</b> posts</p>
                <Link to={"followers"} state={{
                  following: adminDetails.following,
                  followers: adminDetails.followers
                }} className="mr-2"><b>{adminDetails.followers.length}</b> followers</Link>
                <Link to={"following"} state={{
                  following: adminDetails.following,
                  followers: adminDetails.followers
                }} className="mr-2 sm:mr-0"><b>{adminDetails.following.length}</b> following</Link>
              </div>
              {/* bio block */}
              <div className="m-2">
                <p className="font-bold">{adminDetails.name}</p>
                <p>
                  {adminDetails.bio}
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