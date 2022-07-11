const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the user model to be used in server database as a collection
const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
    },
    phoneNum: {
        type: Number,
    },
    email: {
        type: String, 
    },
    password: {
        type: String,
    }
});

// name of the collection is 'user'
module.exports = mongoose.model('user', userSchema);