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
    bio: {
        type: String,
    },
    followers: [{
        type: String,
    }],
    following: [{
        type: String,
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],
    story: [{
        type: String,
    }]
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);