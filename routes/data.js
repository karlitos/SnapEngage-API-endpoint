var express = require('express');
var router = express.Router();
var ChatDataModel = require('../models/chatData');

/* GET data. */
router.get('/', function(req, res, next) {
  ChatDataModel.find(function(err, data) {
    if (err) {
      console.log('ERROR');
      //res.send(err);
      next(err);
    }
    else {
      //console.log(data);
      //res.json(data);
      res.render('data', {title: 'Chat data visualization', data: data });
    }
  });
});

/* POST data. */
router.post('/', function(req, res, next) {
  console.log('New POST request recieved', req.body);
  var chatData = new ChatDataModel();      // create a new instance of the chat data model
  chatData.id = req.body.id;
  chatData.widget_id = req.body.widget_id;
  chatData.url = req.body.url;
  chatData.requested_by = req.body.requested_by;
  chatData.description = req.body.description;
  chatData.created_at_date = new Date(req.body.created_at_date);
  chatData.ip_address = req.body.ip_address;
  chatData.user_agent = req.body.user_agent;
  chatData.browser = req.body.browser;
  chatData.os = req.body.os;
  chatData.country_code  = req.body.country_code;
  chatData.country = req.body.country;
  chatData.latitude = req.body.latitude;
  chatData.longitude = req.body.longitude;
  chatData.language_code = req.body.language_code;
  if (req.body.transcripts && req.body.transcripts.length) {
    var transcripts = [];
    for (var i = 0; i < req.body.transcripts.length; i++) {
      var transcriptData = req.body.transcripts[i];
      var newTranscript = {
        id: transcriptData.id,
        date: new Date(transcriptData.date),
        alias: transcriptData.alias,
        message: transcriptData.message
      }
      transcripts.push(newTranscript);
    }
    chatData.transcripts = transcripts;
  } else {
    chatData.transcripts = [];
  }

  // save the chat data and check for errors
  chatData.save(function(err) {
    if (err){
      //res.send(err);
      next(err);
    }
    else {
      //res.json({ message: 'Chat data created!' });
      res.sendStatus(200)
    }
  });
});

module.exports = router;
