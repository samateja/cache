// Load model from models
const MODEL = require('../models/cache.model.js');
var AppConfig = require('../constants/appConfig');

exports.getKeyById = (req, res) => {

// function to insert/ update cache
const getKey = (MODEL, callback) => {

  if(!req.body.keyName) {
      return res.status(502).send({
          message: "please pass key_name."
      });
  }

  MODEL.findOne({keyName: req.body.keyName }, {_id: 0, keyName: 1, cacheKey: 1 })
  .then(function(resp, err) {
      if(!resp) {
        callback({ message  : "No cache available with key " + req.body.keyName, status : 502 });
      }
      else{
        callback({ message  : "please find the list of keys", keys:resp, status : 200 });
      }

  }).catch(err => {
    console.log("error:::", err);
      if(err.kind === 'ObjectId') {
          return res.status(502).send({
              message: "Cache not found with key " + req.body.key_name
          });
      }
      return res.status(502).send({
          message: "Error updating note with key " + req.body.key_name
      });
  });
}

// final method to create / update
  getKey(MODEL, (data) => {
    if (data.status == 502){
      res.status(502).send(data);
    } else {
      res.status(200).send(data);
    }

  })
}
