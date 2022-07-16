const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    url: {
        type: String
    },
    likes: {
        type: Number
    }
});

module.exports = mongoose.model('post', postSchema);