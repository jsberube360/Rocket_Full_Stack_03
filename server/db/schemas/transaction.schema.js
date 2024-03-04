const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    agent_id: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})


const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;