const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
    age: { type: Number },
    gender: { type: String },
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;