const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    session_token: {
        type: String
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });

SessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });


const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;