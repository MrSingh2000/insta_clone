import React from 'react';
import logo from '../static/login/login_logo.png';
import { BsThreeDots } from 'react-icons/bs';
import mainProfile from "../static/home/mainpp.jpg";
import pp8 from "../static/home/pp8.jpg";
import post1 from "../static/home/sample3.jpg";
import "../styles/custom.css";

function Home() {

  function toggleModal() {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');
  }

  return (

    <div className="flex flex-col items-center">
      <nav className="h-fit p-2 flex items-center m-auto w-full lg:w-2/3 md:justif-around justify-between border-b-2 border-gray-200">
        {/* Camera */}
        <svg aria-label="New Story" className="md:hidden mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="13.191" fill="none" r="4.539" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></circle><path d="M18.592 21.374A3.408 3.408 0 0022 17.966V8.874a3.41 3.41 0 00-3.41-3.409h-.52a2.108 2.108 0 01-1.954-1.375 2.082 2.082 0 00-2.204-1.348h-3.824A2.082 2.082 0 007.884 4.09 2.108 2.108 0 015.93 5.465h-.52A3.41 3.41 0 002 8.875v9.091a3.408 3.408 0 003.408 3.408z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
        <img className="w-24" src={logo} alt="instagram" />
        {/* search box */}
        <div className="md:block hidden relative ">
          <input type="text" id="rounded-email" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search" />
        </div>

        {/* nav icons */}
        <div className="flex">
          {/* Home */}
          <svg aria-label="Home" className="md:block hidden mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
          {/* Messages */}
          <svg aria-label="Messenger" className="mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z" fillRule="evenodd"></path></svg>
          {/* New Post */}
          <svg aria-label="New post" className="md:block hidden mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
          {/* Explore */}
          <svg aria-label="Find People" className="md:block hidden mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
          {/* Favorites (notification section) */}
          <svg aria-label="Activity Feed" className="md:block hidden mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
          {/* profile pic */}
          <span className="md:block hidden rounded-lg" role="link" tabIndex="0" style={{ width: '24px', height: '24px' }}><img alt="mr_singh2000's profile picture" className="rounded-lg" crossOrigin="anonymous" draggable="false" src={mainProfile} /></span>
        </div>

      </nav>
      {/* Main Content */}
      <div className="flex">
        <div>
          {/* Stories */}
          <div className="px-2">
            {/* Stories block */}
            <div className="px-2 rounded-lg border-2 mt-4 p-2">
              {/* Story circle */}
              <div className="w-fit">
                <div className="w-fit rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 p-0.5">
                  <div className="w-fit rounded-full bg-white">
                    <img src={pp8} alt="profile" className="rounded-full border-transparent border-4 w-16" />
                  </div>
                </div>
                {/* username */}
                <p className="text-xs text-center">ahsaassy_</p>
              </div>
            </div>
          </div>
          {/* Posts */}
          <div className="px-2">
            {/* post block */}
            <div className="border-2 border-gray-200 rounded-lg mt-4">
              {/* profile username block */}
              <div className="flex justify-between items-center p-2">
                <div className="flex">
                  <img className="rounded-full h-8 mr-2" src={pp8} alt="profile_pic" />
                  <p className="font-medium">ahsaassy_</p>
                </div>
                <BsThreeDots onClick={(event) => {
                  event.preventDefault();
                  toggleModal();
                }} className="mr-1 cursor-pointer" />
                {/* menu prompt (Modal) */}
                <div className="bg-gray-200 flex items-center justify-center absolute">
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
                <img src={post1} alt="post_1" style={{ maxWidth: '587.5px', width: '100%' }} />
              </div>
            </div>
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
      <div className="w-full md:hidden fixed bottom-0 left-0 right-0 border-t-2 border-grey-200 bg-white p-2">
        <div className="flex justify-around w-full">
          {/* Home */}
          <svg aria-label="Home" className="md:hidden" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
          {/* Search */}
          <svg aria-label="Search &amp; Explore" className="md:hidden" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
          {/* New Post */}
          <svg aria-label="New post" className="md:hidden" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
          {/* Favorites (notification section) */}
          <svg aria-label="Activity Feed" className="md:hidden" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
          {/* profile pic */}
          <span className="md:hidden rounded-lg" role="link" tabIndex="0" style={{ width: '24px', height: '24px' }}><img alt="mr_singh2000's profile picture" className="rounded-lg" crossOrigin="anonymous" draggable="false" src={mainProfile} /></span>
        </div>
      </div>
    </div>
  )
}

export default Home