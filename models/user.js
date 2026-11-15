const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, minLength: 4, maxLength: 50},
    lastName: { type: String},
    email: { type: String, unique: true , trim: true, lowercase: true, required: true, validate: (value) => {
        if(!validator.isEmail(value)) {
            throw new Error("Not an email")
        }
    }},
    age: { type: Number },
    gender: { type: String },
    skills: {type: [String], required: true, default: null},
    password: {type: String, validate(value) {
        if(!validator.isStrongPassword(value)) {
            throw new Error("Secure password needed")
        }
    }}
}, {timestamps: true})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;