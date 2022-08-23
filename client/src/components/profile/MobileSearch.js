import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MobileNav } from '../Navbar';
import { setLoading } from '../state/reducers/loadingReducer';
import { FiSearch } from "react-icons/fi";

function MobileSearch() {
    let authToken = useSelector((store) => store.authToken.value);
    let navigate = useNavigate();
    let dispatch = useDispatch();

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
                    'authToken': authToken
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
                "authToken": authToken,
            }
        }).then((res) => {
            setSearchList(res.data);
        })
    }

    const openUser = (username) => {
        dispatch(setLoading({ value: true }));
        getProfileDetails(username);
    }


    return (
        <div>
            <MobileNav />
            <div className="p-2">
                <label className="flex items-center border-2 rounded-lg">
                    <input onChange={(e) => searchUser(e)} autoComplete="off" autoSave="off" type="text" id="rounded-email" className="rounded-lg border-transparent flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Start typing username" />
                    <FiSearch size={30} className="mx-2"/>
                </label>
                <div style={{ backgroundColor: '#FFFFFF' }} className={`bg-white border-2 border-slate-300 rounded-xl h-40 absolute w-11/12 mt-2 ${searchList.length === 0 ? 'hidden' : ''}`}>
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
        </div>
    )
}

export default MobileSearch