const express = require("express");
const transactionRoutes = express.Router();
const ObjectId = require("mongodb").ObjectId;
const Agent = require('../db/schemas/agent.schema');
const Transaction = require ("../db/schemas/transaction.schema");
 
// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you create a transaction.
transactionRoutes.route("/transaction").post(async function (req, res) {
    try {
        const transaction = await Transaction.validate(req.body);
        const addTransaction = new Transaction(transaction)
        let db_connect = dbo.getDb();
        db_connect
            .collection("transactions")
            .insertOne(addTransaction.toObject(), function (err, result) {
                if (err) throw err;
                res.json(result);
            });
        let myquery = { _id: ObjectId(req.body.agent_id) };

        await db_connect
            .collection("agents")
            .updateOne(myquery, {$inc: {sales: req.body.amount}} )
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// This section will help you get a list of the last 10 transactions.
transactionRoutes.route("/transaction-data").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
      .collection("transactions")
      .find({})
      .limit(10)
      .sort({createdAt: -1})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });

   });

   module.exports = transactionRoutes;