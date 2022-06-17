import React from 'react';
import '../../styles/login.css';
import instaLogo from "../../static/login/login_logo.png";
import googlePlayDownload from "../../static/login/google_play_download_badge.png";
import appstoreDonwlaod from "../../static/login/appstore_download_badge.png";
import phone_cover from "../../static/login/phone_full.png";
import ss1 from "../../static/login/ss1.png";
import ss2 from "../../static/login/ss2.png";
import ss3 from "../../static/login/ss3.png";
import ss4 from "../../static/login/ss4.png";
import { AiFillFacebook } from 'react-icons/ai';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Login() {

    const [ss, setss] = useState(0);
    let ssArr = [ss1, ss2, ss3, ss4];

    const changess = () => {
        setTimeout(() => {
            setss((prevss) => {
                return (prevss === ssArr.length - 1 ? 0 : prevss + 1);
            });
        }, 2500);
    }
    
    useEffect(() => {
      changess();
    })
    
    return (
        <div className="main flex-row">
            <div className="left hidden lg:flex justifu-center items-center ">
                <img src={phone_cover} alt="phone" />
                <img className="absolute -mt-5 ml-40" src={ssArr[ss]} alt="ss" />
            </div>
            <div className="right flex-col">
                <div className="insta-logo flex justify-center items-center">
                    <img src={instaLogo} alt="instagram" />
                </div>
                <div className="login-form">
                    {/* FORM */}

                    <div className="flex flex-col max-w-md px-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                        <div className="p-6 mt-8">
                            <form action="#">
                                <div className="flex flex-col mb-2">
                                    <div className=" relative ">
                                        <input type="text" id="create-account-pseudo" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent" name="username" placeholder="Phone number, username or email" />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className=" relative ">
                                        <input type="text" id="create-account-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent" name="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="flex w-full my-4">
                                    <button type="submit" className="py-2 px-4  bg-sky-600 hover:bg-sky-700 focus:ring-sky-500 focus:ring-offset-sky-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div className="flex justify-center items-center">
                                <hr className="w-2/5 m-auto" />
                                <p className="opacity-50">OR</p>
                                <hr className="w-2/5 m-auto" />
                            </div>
                            <div className="w-full mt-2">
                                <button className="text-sky-700 flex items-center justify-center w-full">
                                    <span><AiFillFacebook /></span>
                                    <span> Log in with Facebook</span>
                                </button>
                            </div>
                            <div className="w-full text-center text-xs opacity-60 mt-2">
                                <p>Forgot password?</p>
                            </div>
                        </div>
                    </div>

                    {/* Dont have an account block */}
                    <div className="flex flex-col max-w-md py-4 mt-3 px-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                        <p>Don't have an account? <span className="text-sky-700">Sign up</span></p>
                    </div>
                </div>

                {/* Download badges block */}
                <div>
                    <div className="p-3 text-center">
                      <p>Get the app </p>
                    </div>
                    <div className="flex justify-center">
                        <img src={googlePlayDownload} alt="googleplay" className="h-10 w-auto mr-1"/>
                        <img src={appstoreDonwlaod} alt="appstore" className="h-10 w-auto"/>
                    </div>
                </div>

            </div>
        </div>
    )
}
