const express = require('express');
const router = express.Router();
require('dotenv').config();
const { check, validationResult, body } = require('express-validator');
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const Chat = require("../models/Chat");

// Route 1: Route to add a user in chats
router.post('/new_user/:friendId', fetchUser, async (req, res) => {
    try {
        // verify logged in user
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }

        let friendId = req.params.friendId;
        friendId = await User.findOne({ username: friendId });
        if (!friendId) {
            return res.status(404).json({ error: "User doesn't exists" });
        }
        let friendInfo = await UserInfo.findOne({ userid: friendId._id });
        console.log(friendInfo);

        let chatInfo = await Chat.findOne({ userid: cUser._id });

        // repeated new user entry is handled on front-end

        let data = {
            userid: cUser._id,
            username: cUser.username,
            chats: chatInfo ? [...chatInfo.chats, {
                friend: friendId.username,
                pic: friendInfo.pic,
                chat: [],
            }] : [{
                friend: friendId.username,
                pic: friendInfo.pic,
                chat: [],
            }],
        }

        await Chat.updateOne({ userid: cUser._id }, data, { upsert: true })
            .then((response) => {
                res.json({ chats: data });
            }).catch((err) => {
                res.status(500).json({ error: err });
            })


    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// ROUTE 2: get all available chats
router.get('/get_chats', fetchUser, async (req, res) => {
    try {
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }

        let chatInfo = await Chat.findOne({ userid: cUser._id });
        if (!chatInfo) {
            return res.json({ chats: [] });
        }
        res.json({ chats: chatInfo });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// ROUTE 3: update chats
router.post('/update', fetchUser, async (req, res) => {
    try {
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }

        let { chat, friend } = req.body;

        let chatInfo = await Chat.findOne({ userid: cUser._id });
        if (!chatInfo) {
            return res.json({ chats: [] });
        }


        for(let i = 0; i < chatInfo.chats.length; i++){
            if(chatInfo.chats[i].friend === friend){
                chatInfo.chats[i].chat = chat;
                await Chat.updateOne({userid: cUser._id}, chatInfo);
                break;
            }
        }
        res.json({ chats: chatInfo });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});


module.exports = router;
