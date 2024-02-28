const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
    session_token: {
        type: String
    },
    user: {
        type: String,
        trim: true,
        required: true,
    },
    email: { 
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    region: {
        type: String,
        enum:{
            values:['north', 'south', 'east', 'west'],
            message: '{VALUE} is not supported'
        },
        required: true,

    },
    rating: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    fee: {
        type: Number,
        min: 0,
        default: 0,
    },
    sales: {
        type: Number,
        min: 0,
        default: 0,
    }
})


const Agent = mongoose.model('Agent', AgentSchema)
module.exports = Agent