const express = require("express");
const jwt = require ("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const uuid = require("uuid")
const Agent = require('../db/schemas/agent.schema');
const User = require('../db/schemas/user.schema');
const Session = require('../db/schemas/session.schema');
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const agentRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the agents.
agentRoutes.route("/agents").get(function (req, res) {
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
agentRoutes.route("/agents/:id").get(function (req, res) {
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
agentRoutes.route("/agents").post(async function (req, res) {
  try{
    const agent = await Agent.validate(req.body);
    const results = agent.toObject()
    let db_connect = dbo.getDb();
    db_connect
    .collection("agents")
    .insertOne(results, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
  catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
 
// This section will help you update an agent by id.
agentRoutes.route("/agents/:id").post(async function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 try {
  const agent = await Agent.validate(req.body)
  let newvalues = {
    $set: agent
  };
  db_connect
    .collection("agents")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 }
 catch (error) {
  console.error("Error:", error);
  return response.status(500).json({ error: "Internal server error" });
}
});
 
// This section will help you delete an agent by id
agentRoutes.route("/agents/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let agentQuery = { _id: ObjectId(req.params.id) };
 let transactionQuery = { agent_id: req.params.id };
 db_connect.collection("transactions").deleteMany(transactionQuery, function (err) {
  if (err) throw err;
  console.log("1 document deleted");
});
 db_connect.collection("agents").deleteOne(agentQuery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});

// This section will help you login
agentRoutes.route("/authenticate").post(async function (req, response) {
  let db_connect = dbo.getDb();
  const user = { email: req.body.email }
  try{
    const res = await db_connect
    .collection("users")
    .findOne(user);
    if (!res) {
      response.status(404).json({})
    }
    else if (res.password === req.body.password) {
      const accessToken = jwt.sign({user_id: res._id}, process.env.ACCESS_TOKEN_SECRET)
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


agentRoutes.route("/session/:userId").post(authenticateToken, async function (req, res) {
  try {
    const userId = req.params.userId;
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId(userId) };
    const user = await db_connect
      .collection("users")
      .findOne(myQuery);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a session token
    const session_token = uuid.v4();

    // Create a session
    const session = new Session({
      session_token,
      User: userId,
    });

    await db_connect
    .collection("sessions")
    .insertOne(session.toObject())

    res.status(200).json({status:"ok", data:{token:session_token}, message:"session saved successfully"});
  } catch (error) {
    console.error("Error generating session token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

agentRoutes.route("/validate_token/:sessionToken").get(authenticateToken, async function (req, res) {
  try {
    const sessionToken = req.params.sessionToken;
    let db_connect = dbo.getDb();
    let myQuery = { session_token: sessionToken };
    const session = await db_connect
      .collection("sessions")
      .findOne(myQuery);
    if (!session) {
      return res.status(200).json({status:"ok", data:{valid:false}});
    }
    const user = await db_connect
    .collection("users")
    .findOne({_id : session.User});
    if (!user) {
      return res.status(200).json({status:"ok", data:{valid:false}});
    }
    return res.status(200).json({status:"ok", data:{valid:true, user:{first_name: user.first_name, last_name: user.last_name, id : user._id}}, message:null});
  } catch (error) {
    console.error("Error generating session token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});




 
module.exports = agentRoutes;
