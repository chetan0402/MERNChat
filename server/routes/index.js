var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { connectToDb } = require("../db");

router.post('/new', function(req, res, next) {
  try{
    const db = connectToDb();
    const UUID = uuidv4();
    const result = db.collection("chats").insertOne({"roomid": UUID,"members":[req.body.name]});
    if(result.acknowledged){
      res.send({"roomid": UUID});
    }else{
      res.send({"error": "Error creating chat"}).status(503);
    }
  }catch(e){
    res.status(500).send({"error": "Error creating chat"});
    throw e;
  }
});

router.post("/join", function(req, res, next){
  try{
    const db = connectToDb();
    const result = db.collection("chats").updateOne({"roomid": req.body.roomid},{$push: {"members": req.body.name}});
    if(result.acknowledged){
      res.send({"roomid": req.body.roomid});
    }else{
      res.send({"error": "Error joining chat"}).status(503);
    }
  }catch(e){
    res.status(500).send({"error": "Error joining chat"});
    throw e;
  }
});

module.exports = router;
