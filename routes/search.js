const express = require('express');
const router = express.Router();
require('dotenv').config();
const { check, validationResult, body } = require('express-validator');
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');

router.get('/get',fetchUser, async (req, res) => {
    try {
        // get the valid info about logged in user
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }
        
        let searchUsername = req.query.search;
        let userNames = await User.find({username: {$regex: `${searchUsername}`, $options: 'i'}}).select('-email').select('-password').select('-phoneNum');
        res.json(userNames);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// this route is also being used to get the loggedIn user details
router.get('/user/:userId',fetchUser, async (req, res) => {
    try {
        // get the valid info about logged in user
        let cUser = req.user.id;
        cUser = await User.findById(cUser);
        if (!cUser) {
            return res.status(404).json({ error: "Invalid User Login" });
        }

        let searchUsername = req.params.userId;
        let userSearched = await User.findOne({username: searchUsername});
        if(!userSearched){
            return res.status(404).json({error: "User not found"});
        }
        let userSearchedDetails = await UserInfo.findOne({userid: userSearched._id});
        res.json(userSearchedDetails);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});


module.exports = router;