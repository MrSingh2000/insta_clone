const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserInfoSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
    },
    pic: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    followers: [{
        type: String,
        default: [],
    }],
    following: [{
        type: String,
        default: [],
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        default: [],
    }],
    story: [{
        type: String,
        default: [],
    }]
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);