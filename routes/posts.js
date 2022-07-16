const express = require('express');
const router = express.Router();
require('dotenv').config();
const UserInfo = require('../models/UserInfo');
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/User');

const multer = require('multer');
var MulterAzureStorage = require('multer-azure-storage');
const Post = require('../models/Post');

var upload = multer({
    storage: new MulterAzureStorage({
        azureStorageConnectionString: process.env.AZURE_CONNECTION_STRING,
        containerName: process.env.AZURE_CONTAINER,
        containerSecurity: 'blob',
    })
});

// Route 1: post a picture in the db
router.post('/add_post', [upload.single('post'), fetchUser], async (req, res) => {
    try {
        // verifying the user authentication
        let user = req.user.id;
        user = await User.findById(user);
        if (!user) {
            return res.status(404).json({ error: "Invalid Login" });
        }
        // checking if the file is uploaded properly to the cloud and the post url is saved in req
        if (!req.file.url) {
            return res.status(500).json({ error: "Cloud Error! Try again Later." });
        }
        // creating a new post document in the Posts collection of database
        let postDetails = await Post.create({
            userid: user._id,
            url: req.file.url,
            likes: 0
        });
        // get the user data from the Userinfo collection
        let data = await UserInfo.findOne({ userid: user._id });
        // if no pre existing data is there, then create new data entry
        if (!data) {
            data = {
                userid: user._id,
                followers: [],
                following: [],
                posts: [postDetails._id]
            }
            await UserInfo.create(data);
        }
        // pre exisiting data exists, so edit it
        else {
            // put the post id in the posts array in userInfo
            let posts = data.posts;
            posts.push(postDetails._id);
            // updating the post array in the userInfo documentation
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
        // user authentication
        let user = req.user.id;
        user = await User.findById(user);
        if (!user) {
            return res.status(404).json({ error: "Invalid Login" });
        }
        // getting the post url from the url parameters
        let postUrl = req.params.url;
        // get the user data from the userInfo collection
        let data = await UserInfo.findOne({ userid: user._id });
        // if data exists do something, else pass
        if (data) {
            // get the post id from the posts collection
            postUrl = await Post.findOne({url: postUrl});
            // delete the post from the post collection too
            await Post.deleteOne({_id: postUrl._id});
            // get the post array from userInfo
            let posts = data.posts;
            // filtering out the removed post Id
            posts = posts.filter((item) => {
                return item === postUrl._id;
            })
            await UserInfo.findByIdAndUpdate(data._id, {
                $set: { "posts": posts }
            });
        }
        res.send("Done");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// Route 3: route to add a story
router.post('/add_story', [upload.single('post'), fetchUser], async (req, res) => {
    try {
        // user authentication
        let user = req.user.id;
        user = await User.findById(user);
        if (!user) {
            return res.status(404).json({ error: "Invalid Login" });
        }
        // get the file url from the req
        if (!req.file.url) {
            return res.status(500).json({ error: "Cloud Error! Try again Later." });
        }
        // get user data from userInfo collection
        let data = await UserInfo.findOne({ userid: user._id });
        // if no pre-existing data, create a new entry
        if (!data) {
            data = {
                userid: user._id,
                followers: [],
                following: [],
                posts: [],
                story: [req.file.url]
            }
            await UserInfo.create(data);
        }
        // if pre-existing data, update the story array
        else {
            let story = data.story;
            story.push(req.file.url);
            await UserInfo.findByIdAndUpdate(data._id, {
                $set: { "story": story }
            });
        }
        res.send("Done");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// Route 4: route to delete a story
router.post('/delete_story/:storyUrl', fetchUser, async (req, res) => {
    try {
        // user authenticaton
        let user = req.user.id;
        user = await User.findById(user);
        if (!user) {
            return res.status(404).json({ error: "Invalid Login" });
        }
        // get story url from the url parameters
        let storyUrl = req.params.storyUrl;
        // get user data from the userInfo collection
        let data = await UserInfo.findOne({ userid: user._id });
        // if data exists, edit it otherwise pass
        if (data) {
            let story = data.story;
            // filter out the story url from the story array
            story = story.filter((item) => {
                return item === storyUrl;
            })
            await UserInfo.findByIdAndUpdate(data._id, {
                $set: { "story": story }
            });
        }
        res.send("Done");

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

module.exports = router;