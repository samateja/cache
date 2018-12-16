// var nodeTtl = require('ttl');
// var cache = new Cache({
//     ttl: 10 * 1000,
//     capacity: 3
// });
// Load model from models
const MODEL = require('../models/cache.model.js');
var AppConfig = require('../constants/appConfig');

exports.getKeys = (req, res) => {

// function to insert/ update cache
const getAllKeys = (MODEL, callback) => {

  MODEL.find({}, { _id: 0, keyName: 1} )
  .then(function(resp, err) {
      if(!resp) {
        callback({ message  : "No keys are left, please create a new key", status : 502 });
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
          message: "Error updating cache with key " + req.body.key_name
      });
  });
}

// final method to create / update
  getAllKeys(MODEL, (data) => {
    if (data.status == 502){
      res.status(502).send(data);
    } else {
      res.status(200).send(data);
    }

  })
}
