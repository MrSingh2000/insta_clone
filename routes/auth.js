const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchUser = require('../middlewares/fetchUser');
const UserInfo = require('../models/UserInfo');
require("dotenv").config();


// Route 1: Route to login
router.post('/login', async (req, res) => {
    await check('username', 'Username should be more than 3 chars').isLength({ min: 3 }).run(req);
    await check('password', "Password should be more than 3 chars").isLength({ min: 3 }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        let { username, password } = req.body;
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                error: "User not Found!"
            });
        }
        let passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        const data = {
            user: {
                id: user.id,
                username: user.username
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred!" });
        // res.json(error)
    }
});

// Route 2: Route to signup 
router.post('/register', [
    check('username').exists(),
    check('password', 'password is not there of length 3').isLength({ min: 4 }),
    check('fullName').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        let { username, password, phoneNum, email, name } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(404).json({ error: "Username is not available" });
        }
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(password, salt);
        if (typeof(phoneNum) !== 'number') {
            phoneNum = 0;
        }
        user = await User.create({
            username, phoneNum, email, password: securePass
        });
        await UserInfo.create({
            userid: user._id,
            name,
            followers: [],
            following: [],
            posts: [],
            bio: "",
        });
        const data = {
            user: {
                id: user.id,
                username: user.username
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});

// Route 3: get user details from the authToken
router.get('/get_user', fetchUser, async (req, res) => {
    try {
        let id = req.user.id;
        let user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(400).json({ error: "User not found!" });
        }
        res.json(user);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred! Try again later" });
    }
});


module.exports = router;
