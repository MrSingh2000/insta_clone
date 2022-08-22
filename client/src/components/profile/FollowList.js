import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom';
import { FollowNav } from '../Navbar';
import { setLoading } from '../state/reducers/loadingReducer';
import nopp from "../../static/home/no_pp.jpg"
import { updateUserDetails } from '../state/reducers/userDetailsReducer';

function FollowList(props) {
    let { type } = useParams();
    let authToken = useSelector((store) => store.authToken.value);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    
    let location = useLocation();
    let { following = [], followers = [] } = location.state;

    const handleUnfollow = (userId) => {
        // user opted to unfollow the user
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
            }).catch((err) => {
                console.log(err);
                dispatch(setLoading({ value: false }));
            });
            navigate('/myprofile');

        }).catch((err) => {
            console.log(err.response.data.error);
            dispatch(setLoading({ value: false }));
        });
    }

    return (
        <>
            {/* Desktop version of follow list */}
            <FollowNav header={type} />

            <div className="container flex flex-col mx-auto w-full sm:w-3/5 items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
                <ul className="flex flex-col divide divide-y w-full">
                    {type === "following" ? (
                        following.map((item, index) => {
                            return (
                                <li className="flex flex-row w-full" key={index}>
                                    <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                                        <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                            <a href="#" className="block relative">
                                                <img alt="profil" src={nopp} className="mx-auto object-cover rounded-full h-10 w-10 " />
                                            </a>
                                        </div>
                                        <div className="flex-1 pl-1 mr-16">
                                            <div className="font-medium dark:text-white">
                                                {item}
                                            </div>
                                        </div>
                                        <button onClick={() => handleUnfollow(item)} type="button" class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Unfollow
                                        </button>
                                    </div>
                                </li>)
                        })) : followers.map((item, index) => {
                            return (
                                <li className="flex flex-row w-full" key={index}>
                                    <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                                        <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                            <a href="#" className="block relative">
                                                <img alt="profil" src={nopp} className="mx-auto object-cover rounded-full h-10 w-10 " />
                                            </a>
                                        </div>
                                        <div className="flex-1 pl-1 mr-16">
                                            <div className="font-medium dark:text-white">
                                                {item}
                                            </div>
                                        </div>
                                        {/* <button type="button" class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            R
                                        </button> */}
                                    </div>
                                </li>)
                        })}


                </ul>
            </div>

        </>
    )
}

export default FollowList