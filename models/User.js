const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the user model to be used in server database as a collection
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum: {
        type: Number,
        required: false
    },
    email: {
        type: String, 
        required: false
    },
    password: {
        type: String,
        required: true
    }
});

// name of the collection is 'user'
module.exports = mongoose.model('user', userSchema);