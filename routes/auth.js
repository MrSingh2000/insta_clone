const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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
        let user = User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                error: "User not Found!"
            });
        }
        let passCompare = bcrypt.compare(password, user.password);
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
    }
});

// Route 2: Route to signup 
router.post('/register', async (req, res) => {
    await check('username', 'Username should be more than 3 chars').isLength({ min: 3 }).run(req);
    await check('password', "Password should be more than 3 chars").isLength({ min: 3 }).run(req);
    await check('fullName', "Password should be more than 3 chars").isLength({ min: 3 }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        let { username, password, phoneNum, email } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(404).json({ error: "Username is not available" });
        }
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(password, salt);
        user = await User.create({
            username, phoneNum, email, securePass
        });
        const data = {
            user: {
                id: user.id,
                username: user.username
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred!" });
    }
});


module.exports = router;
