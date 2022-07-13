const express = require('express');
const router = express.Router();
require('dotenv').config();
const { check, validationResult, body } = require('express-validator');
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const { route } = require('./auth');


// Route 1: Add a following
router.post('/add_following', fetchUser, [
    check('userId').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        // get the valid info about logged in user
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }
        // get valid info about the user we want to follow
        let { userId } = req.body;
        let user = await User.findOne({ username: userId });
        if (!user) {
            return res.status(404).json({ error: "Username is not available" });
        }
        // updating logged in user's following list
        let data = await UserInfo.findOne({ userid: cUser._id });
        if (!data) {
            data = {
                userid: cUser._id,
                followers: [],
                following: [user._id],
                posts: []
            };
            await UserInfo.create(data);
        }
        else {
            let followingList = data.following;
            // check if the user is already in following list
            if (followingList.indexOf(user._id) === -1) {
                followingList.push(user._id);
                await UserInfo.updateOne({ _id: data._id }, {
                    $set: { "following": followingList }
                });
            }
        }

        // updating the user we followed followers list
        let data2 = await UserInfo.findOne({ userid: user._id });
        if (!data2) {
            await UserInfo.create({
                userid: user._id,
                followers: [cUser._id],
                following: [],
                posts: []
            })
        }
        else {
            let followerList = data2.followers;
            // check if the user is already not in the follower list
            if (followerList.indexOf(cUser._id) === -1) {
                followerList.push(cUser._id);
                await UserInfo.updateOne({ _id: data2._id }, {
                    $set: { "followers": followerList }
                });
            }
        }
        res.send("DONE");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// Route 2: Remove a following
router.post('/delete_following', fetchUser, [
    check('userId').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        // verify logged in user
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }
        // verify the user we want to remove from our followings
        let { userId } = req.body;
        let user = await User.findOne({ username: userId });
        if (!user) {
            return res.status(404).json({ error: "Username is not available" });
        }
        // update the following list of logged in user
        let data = await UserInfo.findOne({ userid: cUser._id });
        if (data) {
            let followingList = data.following;
            followingList = followingList.filter((item) => {
                return item === user._id;
            });
            await UserInfo.updateOne({ _id: data._id }, {
                $set: { "following": followingList }
            });
        }

        // update the followers list of the user we unfollowed
        let data2 = await UserInfo.findOne({ userid: user._id });
        if (data2) {
            let followerList = data2.followers;
            followerList = followerList.filter((item) => {
                return item === cUser._id;
            });

            await UserInfo.updateOne({ _id: data2._id }, {
                $set: { "followers": followerList }
            });
        }
        res.send("Done");

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

module.exports = router;