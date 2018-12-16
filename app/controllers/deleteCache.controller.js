// Load model from models
const MODEL = require('../models/cache.model.js');
var AppConfig = require('../constants/appConfig');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({stdTTL: 100, checkperiod: 2});

exports.deleteKeys = (req, res) => {

// function to insert/ update cache
const deleteAllKeys = (MODEL, callback) => {

  MODEL.deleteMany({})
  .then(function(resp, err) {
      if(!resp) {
        myCache.flushAll();
        callback({ message  : "No keys are left to delete, please create a new key", status : 502 });
      }
      else{
        myCache.flushAll();
        callback({ message  : "successfully delete all keys", status : 200 });
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
  deleteAllKeys(MODEL, (data) => {
    if (data.status == 502){
      res.status(502).send(data);
    } else {
      res.status(200).send(data);
    }

  })
}
