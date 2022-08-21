import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import nopp from "../static/home/no_pp.jpg";
import logo from '../static/login/login_logo.png';
import axios from 'axios';
import { setLoading } from './state/reducers/loadingReducer';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useUploadFile } from './common/functions';
import { useSelector } from 'react-redux';

export function DesktopNav() {
    let location = useLocation();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let authToken = useSelector((store) => store.authToken.value);
    let [uploadFile] = useUploadFile();
    let adminDetails = useSelector((store) => store.userDetails.value);

    // console.log(process.env.REACT_APP_AUTH_TOKEN);
    const [profileDrop, setProfileDrop] = useState(false);
    const [searchList, setSearchList] = useState([]);

    const searchUser = (e) => {
        let username = e.target.value;
        if (username.trim() === '') {
            setSearchList([]);
            return;
        }
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/search/get?search=${username}`,
            headers: {
                "authToken": process.env.REACT_APP_AUTH_TOKEN,
            }
        }).then((res) => {
            setSearchList(res.data);
        })
    }

    function togglePostModal() {
        const body = document.querySelector('body');
        const modal = document.querySelector('.postModal');
        modal.classList.toggle('opacity-0');
        modal.classList.toggle('pointer-events-none');
        body.classList.toggle('modal-active');
    }

    const handleUploadFile = (e) => {
        uploadFile(e.target.files[0], "post");
    }

    // function to get the user details, admin want to see
    const getProfileDetails = (userId) => {
        dispatch(setLoading({ value: true }));
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/search/user/${userId}`,
            headers: {
                'authToken': authToken
            }
        }).then(function (res) {
            console.log("runned");
            // get post's urls
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/post/post_url/${userId}`,
                headers: {
                    'authToken': process.env.REACT_APP_AUTH_TOKEN
                }
            }).then((response) => {
                console.log(response);
                dispatch(setLoading({ value: false }));
                navigate(`/user/${userId}`, { state: { posts: response.data.posts, userDetails: res.data } });
            }).catch((err) => {
                console.log(err.response.data.error);
                dispatch(setLoading({ value: false }));
            })
        }).catch((err) => {
            console.log(err.response.data.error);
            dispatch(setLoading({ value: false }));
        });
    }

    const openUser = (username) => {
        dispatch(setLoading({ value: true }));
        getProfileDetails(username);
    }

    return (
        <nav className="h-fit p-2 flex items-center mx-auto w-full lg:w-2/3 justify-between border-b-2 border-gray-200">
            {location.pathname.indexOf("/user/") === -1 ? (
                // Camera icon
                <>
                    <svg aria-label="New Story" className='sm:hidden mx-3' color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="13.191" fill="none" r="4.539" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></circle><path d="M18.592 21.374A3.408 3.408 0 0022 17.966V8.874a3.41 3.41 0 00-3.41-3.409h-.52a2.108 2.108 0 01-1.954-1.375 2.082 2.082 0 00-2.204-1.348h-3.824A2.082 2.082 0 007.884 4.09 2.108 2.108 0 015.93 5.465h-.52A3.41 3.41 0 002 8.875v9.091a3.408 3.408 0 003.408 3.408z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                </>
            ) : (
                // back button in case of a profile is searched
                <svg onClick={() => navigate(-1)} aria-label="Back" className='-rotate-90 sm:hidden' color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg>
            )
            }


            <img className="w-24" src={logo} alt="instagram" />
            {/* search box */}
            <div className="md:block hidden relative ">
                <input onChange={(e) => searchUser(e)} autoComplete="off" autoSave="off" type="text" id="rounded-email" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search" />
                <div style={{ backgroundColor: '#FFFFFF' }} className={`border-2 border-slate-300 rounded-xl h-40 absolute w-full mt-1 ${searchList.length === 0 ? 'hidden' : ''}`}>
                    <ul>

                        {searchList.map((user) => {
                            return (
                                <li key={user._id} className="w-full" onClick={() => openUser(user.username)}>
                                    <button className="w-full">
                                        {user.username}
                                    </button>
                                    <hr />
                                </li>)
                        })}

                    </ul>
                </div>
            </div>

            {/* nav icons */}
            <div className="flex">
                {/* Home */}
                <Link to="/" className="cursor-pointer">
                    <svg aria-label="Home" className="md:block hidden mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
                </Link>
                {/* Messages */}
                <Link to="/myprofile/chat" className="cursor-pointer">
                    <svg className={`${location.pathname.indexOf("/user/") !== -1 ? "hidden" : ""} mx-3`} aria-label="Messenger" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z" fillRule="evenodd"></path></svg>
                </Link>
                {/* New Post */}
                <button onClick={(event) => {
                    event.preventDefault();
                    togglePostModal();
                }} className='cursor-pointer'>
                    <svg aria-label="New post" className="md:block hidden mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                </button>
                {/* Explore */}
                <Link to="/" className="cursor-pointer">
                    <svg aria-label="Find People" className="md:block hidden mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
                </Link>
                {/* Favorites (notification section) */}
                <Link to="/" className="cursor-pointer">
                    <svg aria-label="Activity Feed" className="md:block hidden mx-3" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
                </Link>
                <div className="relative inline-block text-left md:block hidden">
                    <div>
                        <button onClick={() => { setProfileDrop((prevState) => !prevState) }} type="button" className="flex items-center justify-center w-6 h-6 rounded-lg" id="options-menu">
                            <img alt="mr_singh2000's profile picture" className="rounded-lg" draggable="false" src={adminDetails.pic ? adminDetails.pic : nopp} />
                        </button>
                    </div>
                    <div className={`${profileDrop ? "block" : "hidden"} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5`}>
                        <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <Link to="/myprofile" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                <span className="flex flex-col">
                                    <span className="flex items-center">
                                        <svg aria-label="Profile" className="mr-2" color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16"><circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle><path d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></path><circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle></svg>
                                        Profile
                                    </span>
                                </span>
                            </Link>
                            <a href="#" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                <span className="flex flex-col">
                                    <span className="flex items-center">
                                        <svg aria-label="Saved" className="mr-2" color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                                        Saved
                                    </span>
                                </span>
                            </a>
                            <a href="#" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                <span className="flex flex-col">
                                    <span className="flex items-center">
                                        <svg aria-label="Settings" className="mr-2" color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                        Settings
                                    </span>
                                </span>
                            </a>
                            <hr />
                            <a href="#" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                <span className="flex flex-col">
                                    <span className="flex items-center">
                                        Log Out
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* add post popup block */}
            <div className="bg-gray-200 flex items-center justify-center absolute z-10">
                <div className="postModal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
                    <div onClick={togglePostModal} className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-2 text-left px-6">
                            <div className="flex flex-col justify-between items-center pb-3">
                                <p className="border-b-2 border-grey-200 w-full text-center py-1 text-black-700 font-medium">Create New Post</p>
                                <hr />
                                <div className="p-10 flex flex-col justify-center items-center">
                                    <svg aria-label="Icon to represent media such as images or videos" className="_ab6-" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                    <p className="text-2xl font-light mb-4">Drag photos and videos here</p>
                                    <label className="fileLabel">
                                        <input onChange={(e) => handleUploadFile(e)} type="file" />
                                        <span>Select from computer</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav >

    )
}

export function MobileNav() {
    let adminDetails = useSelector((store) => store.userDetails.value);

    const uploadPost = (file) => {
        let data = new FormData();
        data.append("post", file);
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/user/profile_pic`,
            headers: {
                "auth-token": process.env.AUTH_TOKEN,
                "Content-Type": "ultipart/form-data",
            },
            data
        }).then((res) => {
            console.log(res);
        })
    }

    return (
        <div className="w-full md:hidden fixed bottom-0 left-0 right-0 border-t-2 border-grey-200 bg-white p-2">
            <div className="flex justify-around w-full">
                {/* Home */}
                <Link to="/" className="cursor-pointer">
                    <svg aria-label="Home" className="md:hidden" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
                </Link>
                {/* Search */}
                <Link to="/" className="cursor-pointer">
                    <svg aria-label="Search &amp; Explore" className="md:hidden" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                </Link>
                {/* New Post */}
                <label>
                    <svg aria-label="New post" className="md:hidden" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                    <input onChange={(e) => uploadPost(e.target.files[0])} type="file" className="absolute invisible" />
                </label>
                {/* Favorites (notification section) */}
                <Link to="/" className="cursor-pointer">
                    <svg aria-label="Activity Feed" className="md:hidden" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
                </Link>
                {/* profile pic */}
                <Link to="/myprofile" style={{ width: '24px', height: '24px' }}>
                    <span className="md:hidden rounded-lg" role="link" tabIndex="0" style={{ width: '24px', height: '24px' }}><img alt="mr_singh2000's profile picture" className="rounded-lg" draggable="false" src={adminDetails.pic ? adminDetails.pic : nopp} /></span>
                </Link>
            </div>
        </div>
    )
}

export function FollowNav(props) {
    let navigate = useNavigate();
    let { header } = props;
    return (
        <nav className="h-fit p-2 flex items-center m-auto w-full lg:w-2/3 md:justif-around justify-between border-b-2 border-gray-200">
            <div className="w-full border-grey-200 bg-white p-2">
                <div className="flex justify-around w-full items-center">
                    <svg onClick={() => navigate(-1)} aria-label="Back" className='-rotate-90' color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg>
                    <p className="w-full text-center font-semibold text-lg capitalize">{header}</p>
                </div>
            </div>
        </nav>
    )
}