const express = require('express');
const router = express.Router();
require('dotenv').config();
const UserInfo = require('../models/UserInfo');
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/User');

const multer = require('multer');
var MulterAzureStorage = require('multer-azure-storage');

var upload = multer({
    storage: new MulterAzureStorage({
        azureStorageConnectionString: process.env.AZURE_CONNECTION_STRING,
        containerName: process.env.AZURE_CONTAINER,
        containerSecurity: 'blob',
        // fileName: req.user.username + "profilePic"
    })
});

// Route 1: post a picture in the db
router.post('/add_post', [upload.single('post'), fetchUser], async (req, res) => {
    try {
        console.log(req);
        let user = req.user.id;
        user = await User.findById(user);
        if (!user) {
            return res.status(404).json({ error: "Invalid Login" });
        }
        if (!req.file.url) {
            return res.status(500).json({ error: "Cloud Error! Try again Later." });
        }
        let data = await UserInfo.findOne({ userid: user._id });
        if (!data) {
            data = {
                userid: user._id,
                followers: [],
                following: [],
                posts: [req.file.url]
            }
            await UserInfo.create(data);
        }
        else {
            let posts = data.posts;
            posts.push(req.file.url);
            await UserInfo.findByIdAndUpdate(data._id, {
                $set: { "posts": posts }
            });
        }
        res.send("Done");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// Route 2: Route to delete a post
router.post('/delete_post/:url', fetchUser, async (req, res) => {
    try {
        let user = req.user.id;
        user = await User.findById(user);
        if (!user) {
            return res.status(404).json({ error: "Invalid Login" });
        }
        let postUrl = req.params.url;
        let data = await UserInfo.findOne({userid: user._id});
        if(data){
           let posts = data.posts;
           posts = posts.filter((item) => {
               return item === postUrl;
           }) 
           await UserInfo.findByIdAndUpdate(data._id, {
               $set : {"posts": posts}
           });
        }
        res.send("Done");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

module.exports = router;