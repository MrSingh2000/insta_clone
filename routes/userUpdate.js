const express = require('express');
const router = express.Router();
require('dotenv').config();
const { check, validationResult, body } = require('express-validator');
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');

const multer = require('multer');
var MulterAzureStorage = require('multer-azure-storage');

var upload = multer({
    storage: new MulterAzureStorage({
        azureStorageConnectionString: process.env.AZURE_CONNECTION_STRING,
        containerName: process.env.AZURE_CONTAINER,
        containerSecurity: 'blob',
    })
});

// ROUTE 1: update user's name
router.post('/name', fetchUser, async (req, res) => {
    try {
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }
        let newName = req.body.name;
        await UserInfo.updateOne({ userid: cUser._id }, {
            $set: { "name": newName }
        });
        res.send("success");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// ROUTE 2: update user's bio
router.post('/bio', fetchUser, async (req, res) => {
    try {
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }
        let newBio = req.body.bio;
        await UserInfo.updateOne({ userid: cUser._id }, {
            $set: { "bio": newBio }
        });
        res.send("success");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// ROUTE 3: send user's details
router.get('/get_details', fetchUser, async (req, res) => {
    try {
        // get the valid info about logged in user
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }
        let details = await UserInfo.findOne({ userid: cUser._id });
        details = {
            _id: details._id,
            userid: details.userid,
            followers: details.followers,
            following: details.following,
            posts: details.posts,
            name: details.name,
            bio: details.bio,
            username: cUser.username,
            pic: details.pic,
        }
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// ROUTE 4: update a user's profile
router.post('/pic', [upload.single('pic'), fetchUser], async (req, res) => {
    try {
        // get the valid info about logged in user
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }

        // checking if the file is uploaded properly to the cloud and the post url is saved in req
        if (!req.file.url) {
            return res.status(500).json({ error: "Cloud Error! Try again Later." });
        }

        UserInfo.updateOne({ userid: cUser._id }, {
            $set: {"pic": req.file.url}
        }).then((response) => {
            res.send("success");
        }).catch((err) =>{
            console.log(err);
            res.status(504).json({error: "Server time out"});
        });
        

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});


module.exports = router;