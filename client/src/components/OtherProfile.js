import React, { useState, useEffect } from 'react';
import logo from '../static/login/login_logo.png';
import mainProfile from "../static/home/mainpp.jpg";
import { RiSettings3Line } from "react-icons/ri";
import { Link, useLocation, useParams } from "react-router-dom";
import { DesktopNav, MobileNav } from "./Navbar";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from './state/reducers/loadingReducer';
import Loader from './common/Loader';
import { updateUserDetails } from './state/reducers/userDetailsReducer';

function OtherProfile() {
    let location = useLocation();
    let loading = useSelector((store) => store.loading.value);
    let dispatch = useDispatch();

    let authToken = useSelector((store) => store.authToken.value);

    let params = useParams();
    let userId = params.userId;

    const [userDetails, setUserDetails] = useState(null);
    const [posts, setPosts] = useState([]);

    let admin = useSelector((store) => store.userDetails.value);

    // get the profile details of this user
    const getProfileDetails = () => {
        dispatch(setLoading({ value: true }));
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/search/user/${userId}`,
            headers: {
                'authToken': authToken
            }
        }).then(function (res) {
            setUserDetails(res.data);
            console.log("runned");
            // get post's urls
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/post/post_url/${userId}`,
                headers: {
                    'authToken': process.env.REACT_APP_AUTH_TOKEN
                }
            }).then((res) => {
                setPosts(res.data.posts);
                dispatch(setLoading({ value: false }));
            }).catch((err) => {
                console.log(err.response.data.error);
                dispatch(setLoading({ value: false }));
            })
        }).catch((err) => {
            console.log(err.response.data.error);
            dispatch(setLoading({ value: false }));
        });
    }

    useEffect(() => {
        getProfileDetails();
    }, [userId]);

    const handleFollow = () => {
        dispatch(setLoading({ value: true }));

        if (admin?.following?.indexOf(userId) !== -1) {
            // this code runs if the user is already followed
            // req sent to server to unfollow the person
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_HOST}/api/user/delete_following`,
                headers: {
                    'authToken': authToken
                },
                data: {
                    userId
                }
            }).then(function (res) {
                // again refresh the admin's details by sending new req. to the server
                axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_HOST}/api/update/get_details`,
                    headers: {
                        'authToken': process.env.REACT_APP_AUTH_TOKEN
                    }
                }).then((res) => {
                    dispatch(updateUserDetails(res.data));
                    // either user is followed or not, we need to refresh the user details
                    getProfileDetails();
                }).catch((err) => {
                    console.log(err);
                    dispatch(setLoading({ value: false }));
                });

            }).catch((err) => {
                console.log(err.response.data.error);
                dispatch(setLoading({ value: false }));
            });
        }
        else {

            // a new following is added, so a req to the server is sent
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_HOST}/api/user/add_following`,
                headers: {
                    'authToken': authToken
                },
                data: {
                    userId
                }
            }).then(function (res) {
                console.log(res);
                // again refresh the admin's details by sending new req. to the server
                axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_HOST}/api/update/get_details`,
                    headers: {
                        'authToken': process.env.REACT_APP_AUTH_TOKEN
                    }
                }).then((res) => {
                    dispatch(updateUserDetails(res.data));
                    // either user is followed or not, we need to refresh the user details
                    getProfileDetails();
                }).catch((err) => {
                    console.log(err);
                    dispatch(setLoading({ value: false }));
                });

            }).catch((err) => {
                console.log(err.response.data.error);
                dispatch(setLoading({ value: false }));
            });
        }
    }


    return loading ? (<Loader />) : (
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
                                <p className="m-2 font-thin text-3xl">{userId}</p>
                                <button className="m-2 border-2 p-1 rounded-lg font-medium w-20 sm:block hidden">Message</button>
                                <button onClick={handleFollow} className={`m-2 border-2 p-1 rounded-lg font-medium w-20 sm:block hidden ${admin?.following?.indexOf(userId) === -1 ? "bg-sky-400 text-white border-sky-400" : 'bg-red-500 text-white border-red-500'}`}>{admin?.following?.indexOf(userId) !== -1 ? "Unfollow" : "Follow"}</button>
                            </div>
                            <div className="flex justify-evenly">
                                <button className="border-2 p-1 rounded-lg font-medium w-20 sm:hidden block">Message</button>
                                <button onClick={handleFollow} className={`border-2 p-1 rounded-lg font-medium w-20 sm:hidden block ${admin?.following?.indexOf(userId) === -1 ? "bg-sky-400 text-white border-sky-400" : 'bg-red-500 text-white border-red-500'}`}>{admin?.following?.indexOf(userId) !== -1 ? "Unfollow" : "Follow"}</button>
                            </div>
                            {/* followers block */}
                            <div className="flex justify-between items-center mt-2 m-2 w-full">
                                <p><b>{userDetails.posts.length}</b> posts</p>
                                <p><b>{userDetails.followers.length}</b> followers</p>
                                <p><b>{userDetails.following.length}</b> following</p>
                            </div>
                            {/* bio block */}
                            <div className="m-2">
                                <p className="font-bold">{userDetails?.name}</p>
                                <p>
                                    {userDetails?.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Posts block */}
                    <hr className="font-bold" style={{ color: 'black' }} />
                    {userDetails?.posts?.length === 0 ?
                        (<p className="text-center text-xl font-bold my-5 opacity-25">No Posts</p>)
                        :
                        <div className="grid grid-cols-3 gap-4 my-5">
                            {posts?.map((postUrl) => {
                                return (
                                    <div key={postUrl} className="flex justify-center bg-slate-200">
                                        <img src={postUrl} alt="post" className="max-h-60" />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>

                {/* Mobile Nav Bar */}
                <MobileNav />
            </div>
        </>
    )
}

export default OtherProfile