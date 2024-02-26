const express = require("express");
const jwt = require ("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const Agent = require('../db/schemas/agent.schema');
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const agentRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the agents.
agentRoutes.get("/agents", authenticateToken, function (req, res) {
 let db_connect = dbo.getDb();
 db_connect
   .collection("agents")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single agent by id
agentRoutes.route("/agents/:id").get(authenticateToken, function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("agents")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new agent.
agentRoutes.route("/agents").post(authenticateToken, function (req, res) {
  const agent = new Agent(req.body);
  const results = agent.toObject()
  let db_connect = dbo.getDb();
  db_connect
   .collection("agents")
   .insertOne(results, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you update an agent by id.
agentRoutes.route("/agents/:id").post(authenticateToken, function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email:req.body.email,
    region: req.body.region,
    rating: req.body.rating,
    fee: req.body.fee,
    sales: req.body.sales,
   },
 };
 db_connect
   .collection("agents")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete an agent by id
agentRoutes.route("/agents/:id").delete(authenticateToken, (req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("agents").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});

// This section will help you login
agentRoutes.route("/auth/login").post(async function (req, response) {
  let db_connect = dbo.getDb();
  const user = { email: req.body.email }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  try{
    const res = await db_connect
    .collection("users")
    .findOne(user);
    if (!res) {
      response.status(404).json({})
    }
    else if (res.password === req.body.password) {

      response.status(200).json({access_token: accessToken})
    }
    else {
      response.status(401).json({})
    }
  }
  catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// middleware that verify if the code from the headers match the token from the .env

function authenticateToken (req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
      return res.sendStatus(401);
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}



 
module.exports = agentRoutes;
