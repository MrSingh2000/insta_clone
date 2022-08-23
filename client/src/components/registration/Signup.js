import React from 'react';
import instaLogo from "../../static/login/login_logo.png";
import { AiFillFacebook } from 'react-icons/ai';
import googlePlayDownload from "../../static/login/google_play_download_badge.png";
import appstoreDonwlaod from "../../static/login/appstore_download_badge.png";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../state/reducers/loadingReducer';
import { setAuthToken } from '../state/reducers/authTokenReducer';
import { useGetUserDetails } from '../common/functions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    let dispatch = useDispatch();
    let [getUserDetails] = useGetUserDetails();
    let navigate = useNavigate();

    const [details, setDetails] = useState({
        username: "",
        fullName: "",
        phoneNum: "",
        // email: "",
        password: "",
        // name: ""
    });

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            ...details,
            email: details.phoneNum,
            name: details.fullName,
        }

        dispatch(setLoading({ value: true }));
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/auth/register`,
            data
        }).then((res) => {
            localStorage.clear();
            dispatch(setAuthToken(res.data.authToken));
            getUserDetails("admin", true, res.data.authToken);
            localStorage.setItem("authToken", res.data.authToken);
            navigate('/');
        }).catch((err) => {
            console.log(err);
            dispatch(setLoading({ value: false }));
        })

    }

    return (
        <div className="flex justify-center items-center h-auto flex-col my-4">
            <div className="border-2 border-slate-200 pt-14">
                <div className="insta-logo flex justify-center items-center">
                    <img src={instaLogo} alt="instagram" />
                </div>
                <div className="my-1">
                    <p className="opacity-60 text-center">
                        Sign up to see photos and videos<br />from your friends.
                    </p>
                </div>
                <div className="my-2 px-14">
                    <button className="rounded-sm text-white bg-sky-600 flex items-center justify-center w-full">
                        <span className="mr-2"><AiFillFacebook /></span>
                        <span>Log in with Facebook</span>
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <hr className="w-2/5 m-auto" />
                    <p className="opacity-50">OR</p>
                    <hr className="w-2/5 m-auto" />
                </div>
                <div className="login-form m-auto">
                    {/* FORM */}
                    <div className="flex flex-col max-w-md px-2 bg-white rounded-lg dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                        <div className="p-6 mt-1">
                            <form>
                                <div className="flex flex-col mb-2">
                                    <div className=" relative ">
                                        <input onChange={(e) => handleChange(e)} type="text" id="create-account-pseudo" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent" name="phoneNum" placeholder="Mobile Number or Email" />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className=" relative ">
                                        <input onChange={(e) => handleChange(e)} type="text" id="create-account-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent" name="fullName" placeholder="Full Name" />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className=" relative ">
                                        <input onChange={(e) => handleChange(e)} type="text" id="create-account-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent" name="username" placeholder="Username" />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className=" relative ">
                                        <input onChange={(e) => handleChange(e)} type="text" id="create-account-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent" name="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-center opacity-60 mb-2">
                                        People who use our service may have uploaded<br />your contact information to Instagram.<br />Learn More
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-center opacity-60">By signing up, you agree to our<br />Terms , Data Policy and Cookies Policy .</p>
                                </div>
                                <div className="flex w-full my-4">
                                    <button onClick={(e) => handleSubmit(e)} type="submit" className="py-2 px-4  bg-sky-600 hover:bg-sky-700 focus:ring-sky-500 focus:ring-offset-sky-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-2 border-slate-200 mt-2 px-16">
                {/* Dont have an account block */}
                <div className="flex flex-col max-w-md py-4 mt-3 px-4 bg-white rounded-lg dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                    <p>Have an account? <span className="text-sky-700">Log in</span></p>
                </div>
            </div>

            {/* Download badges block */}
            <div>
                <div className="p-3 text-center">
                    <p>Get the app </p>
                </div>
                <div className="flex justify-center">
                    <img src={googlePlayDownload} alt="googleplay" className="h-10 w-auto mr-1" />
                    <img src={appstoreDonwlaod} alt="appstore" className="h-10 w-auto" />
                </div>
            </div>
        </div >
    )
}
