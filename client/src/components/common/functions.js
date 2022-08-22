import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../state/reducers/loadingReducer";
import { updateUserDetails } from "../state/reducers/userDetailsReducer";
import { updatePosts } from "../state/reducers/userPostReducer";
import { updateAdminChat } from '../state/reducers/adminChatreducer';
import { connectToSocketServer } from '../../socket';
import authTokenReducer, { setAuthToken } from '../state/reducers/authTokenReducer';
import { useNavigate, useNavigationType } from 'react-router-dom';

// THESE ARE CUSTOM REACT HOOKS

export function useUploadFile(props) {
    let dispatch = useDispatch();
    let [getUserDetails] = useGetUserDetails();
    let authToken = useSelector((store) => store.authToken.value);

    const uploadFile = (file, type) => {
        dispatch(setLoading({ value: true }));
        let data = new FormData();
        let url;
        if (type === "post") {
            data.append("post", file);
            url = `${process.env.REACT_APP_HOST}/api/post/add_post`
        }
        else {
            data.append("pic", file);
            url = `${process.env.REACT_APP_HOST}/api/update/pic`
            console.log("here")
        }
        axios({
            method: 'post',
            url,
            headers: {
                "authToken": authToken,
                "Content-Type": "ultipart/form-data",
            },
            data
        }).then((res) => {
            getUserDetails("admin");
        }).catch((err) => {
            console.log(err);
            dispatch(setLoading({ value: false }));
        })
    }

    return [uploadFile];
}


// works only to get Admin's posts
export function useGetPostUrls(props) {
    let dispatch = useDispatch();
    let authToken = useSelector((store) => store.authToken.value);


    const getPostUrls = (posts, token) => {
        // getting user posts
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/post/get_posts`,
            headers: {
                'authToken': authToken ? authToken : token
            }
        }).then((res) => {
            dispatch(updatePosts([...res.data.posts]));
            dispatch(setLoading({ value: false }));
        }).catch((err) => {
            console.log(err);
            dispatch(setLoading({ value: false }));
        });
    }

    const getOtherUserPosts = (userId, setPosts) => {
        dispatch(setLoading({ value: true }));
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/post/post_url/${userId}`,
            headers: {
                'authToken': authToken
            }
        }).then((response) => {
            setPosts(response.data.posts);
            dispatch(setLoading({ value: false }));
        }).catch((err) => {
            console.log(err.response.data.error);
            dispatch(setLoading({ value: false }));
        })
    }

    return [getPostUrls, getOtherUserPosts];

}

export function useGetUserDetails(props) {
    let dispatch = useDispatch();
    let [getPostUrls, getOtherUserPosts] = useGetPostUrls();
    let authToken = useSelector((store) => store.authToken.value);

    const getUserDetails = (userType, posts = true, token = null) => {
        if (userType === "admin") {
            // getting user Details
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/update/get_details`,
                headers: {
                    'authToken': authToken ? authToken : token
                }
            }).then((res) => {
                dispatch(updateUserDetails(res.data));
                connectToSocketServer(res.data.username);
                // get admin chats
                axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_HOST}/api/chat/get_chats`,
                    headers: {
                        "authToken": authToken ? authToken : token,
                    }
                }).then((res) => {
                    dispatch(updateAdminChat(res.data.chats.chats));
                    dispatch(setLoading({ value: false }));
                }).catch((err) => {
                    console.log(err);
                    dispatch(setLoading({ value: false }));
                })

                if (posts) {
                    // get admin post's URLs
                    getPostUrls(res.data.posts, token);
                }
                else {
                    dispatch(setLoading({ value: false }));
                }
            }).catch((err) => {
                console.log(err.response.data.error);
                dispatch(setLoading({ value: false }));
            });

        }
    }

    const getOtherUserDetails = (userId) => {
        dispatch(setLoading({ value: true }));
        // const [userDetails, setUserDetails] = useState(null);

        return new Promise((resolve, reject) => {

            axios({
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/search/user/${userId}`,
                headers: {
                    'authToken': authToken
                }
            }).then(function (res) {
                // setUserDetails(res.data);
                resolve(res.data);
            }).catch((err) => {
                console.log(err);
                reject();
                dispatch(setLoading({ value: false }));
            });

        })
    }

    return [getUserDetails, getOtherUserDetails];
}

export function useAdminChat(props) {
    let dispatch = useDispatch();
    let authToken = useSelector((store) => store.authToken.value);

    useEffect(() => {
        dispatch(setLoading({ value: true }));
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/chat/get_chats`,
            headers: {
                "authToken": authToken,
            }
        }).then((res) => {
            dispatch(updateAdminChat(res.data.chats.chats));
            dispatch(setLoading({ value: false }));
        }).catch((err) => {
            console.log(err);
            dispatch(setLoading({ value: false }));
        })
    }, []);

}

// Login function
export function useLogin(props) {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [getUserDetails] = useGetUserDetails();

    const login = (username, password) => {
        dispatch(setLoading({ value: true }));
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/auth/login`,
            data: {
                username,
                password
            }
        }).then((res) => {
            console.log(res.data);
            dispatch(setAuthToken(res.data.authToken));
            getUserDetails("admin", true, res.data.authToken);
            localStorage.setItem("authToken", res.data.authToken);
            navigate('/');
        }).catch((err) => {
            console.log(err);
            dispatch(setLoading({ value: false }));
        })
    }

    return [login];
}

export function useChat(props) {
    let authToken = useSelector((store) => store.authToken.value);
    let dispatch = useDispatch();
    let [getUserDetails] = useGetUserDetails();
    let adminChat = useSelector((store) => store.adminChat.value);

    const addChat = (username) => {
        dispatch(setLoading({ value: true }));
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/chat/new_user/${username}`,
            headers: {
                'authToken': authToken
            }
        }).then((res) => {
            dispatch(updateAdminChat(res.data.chats.chats));
            getUserDetails("admin", false);
            dispatch(setLoading({ value: false }));
        }).catch((err) => {
            console.log(err.response.data.error);
            dispatch(setLoading({ value: false }));
        })
    }

    // const updateChat = (from, message, username) => {

    //     for (let i = 0; i < adminChat.length; i++) {
    //         if (adminChat[i].friend === username) {
    //             adminChat[i].chat.push({
    //                 from: from === "admin" ? "a" : "b",
    //                 to: from === "admin" ? "b" : "a",
    //                 message,
    //             });
    //             console.log("admin chat: ", adminChat);
    //             dispatch(updateAdminChat(adminChat));
    //             break;
    //         }
    //     }
    //     console.log("i ma here");
    // }

    return [addChat];
}