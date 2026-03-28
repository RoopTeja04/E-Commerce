const mongoose = require("mongoose");

const NewsLetterSchema = new mongoose.Schema({
    email: {
        type:String,
        unique: true,
        required: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    nextDate: {
        type: Date,
        default: Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    isActive: {
        type: Boolean,
        default: true
    },
    unsubscribedAt: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model("NewsLetter", NewsLetterSchema);