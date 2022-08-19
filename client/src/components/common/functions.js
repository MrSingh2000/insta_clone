import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../state/reducers/loadingReducer";
import { updateUserDetails } from "../state/reducers/userDetailsReducer";
import { updatePosts } from "../state/reducers/userPostReducer";

// THESE ARE CUSTOM REACT HOOKS

export function useUploadFile(props) {
    let dispatch = useDispatch();
    let [getUserDetails] = useGetUserDetails();

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
                "authToken": process.env.REACT_APP_AUTH_TOKEN,
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

    const getPostUrls = (posts) => {
        // getting user posts
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/post/get_posts`,
            headers: {
                'authToken': process.env.REACT_APP_AUTH_TOKEN
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
                'authToken': process.env.REACT_APP_AUTH_TOKEN
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

    const getUserDetails = (userType, posts = true) => {
        if (userType === "admin") {
            // getting user Details
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/update/get_details`,
                headers: {
                    'authToken': process.env.REACT_APP_AUTH_TOKEN
                }
            }).then((res) => {
                dispatch(updateUserDetails(res.data));
                if (posts) {
                    getPostUrls(res.data.posts);
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