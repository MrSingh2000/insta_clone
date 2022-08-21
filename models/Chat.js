const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    username: {
        type: String,
    },
    chats: [{
        // username of friend
        friend: { type: String },
        pic: { type: String },
        chat: [{
            // from and to have 2 values only, a and b, a for admin and b for friend
            from: { type: String },
            to: { type: String },
            message: { type: String },
        }],
    }]
});

module.exports = mongoose.model('chat', chatSchema);