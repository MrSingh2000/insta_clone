import React, { useState, useEffect } from 'react';
import logo from '../static/login/login_logo.png';
import mainProfile from "../static/home/mainpp.jpg";
import { RiSettings3Line } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { DesktopNav, MobileNav } from "./Navbar";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function OtherProfile() {
    let authToken = useSelector((store) => store.authToken.value);

    let params = useParams();
    let userId = params.userId;

    const [userDetails, setUserDetails] = useState(null);
    const [posts, setPosts] = useState([]);

    let admin = useSelector((store) => store.userDetails.value);

    const getProfileDetails = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/search/user/${userId}`,
            headers: {
                'authToken': authToken
            }
        }).then(function (res) {
            setUserDetails(res.data);
            // get post's urls
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/post/post_url/${userId}`,
                headers: {
                    'authToken': process.env.REACT_APP_AUTH_TOKEN
                }
            }).then((res) => {
                setPosts(res.data.posts);
            }).catch((err) => {
                console.log(err.response.data.error);
            })
        }).catch((err) => {
            console.log(err.response.data.error);
        });
    }

    useEffect(() => {
        getProfileDetails();
    }, [])


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
                                <p className="m-2 font-thin text-3xl">{userId}</p>
                                <button className="m-2 border-2 p-1 rounded-lg font-medium w-20 sm:block hidden">Message</button>
                                <button className={`m-2 border-2 p-1 rounded-lg font-medium w-20 sm:block hidden ${admin?.following?.indexOf(userDetails) === -1 ? "bg-sky-400 text-white border-sky-400" : ''}`}>{admin?.following?.indexOf(userDetails?._id) !== -1 ? "Done" : "Follow"}</button>
                            </div>
                            <div className="flex justify-evenly">
                                <button className="border-2 p-1 rounded-lg font-medium w-20 sm:hidden block">Message</button>
                                <button className={`border-2 p-1 rounded-lg font-medium w-20 sm:hidden block ${admin?.following?.indexOf(userDetails) === -1 ? "bg-sky-400 text-white border-sky-400" : ''}`}>{admin?.following?.indexOf(userDetails?._id) !== -1 ? "Done" : "Follow"}</button>
                            </div>
                            {/* followers block */}
                            <div className="flex justify-between items-center mt-2 m-2 w-full">
                                <p><b>{userDetails?.posts?.length}</b> posts</p>
                                <p><b>{userDetails?.followers?.length}</b> followers</p>
                                <p><b>{userDetails?.following?.length}</b> following</p>
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