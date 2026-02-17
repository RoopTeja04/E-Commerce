const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    address:{
        type:String,
    },
    role: {
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isVerified: {
        type:Boolean, 
        default:false
    },
    OTP: {
        type:String,
        default: ""
    },
    OTPExpiry: {
        type:Date,
        default: Date.now()
    }
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);