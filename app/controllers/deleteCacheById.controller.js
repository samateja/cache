// Load model from models
const MODEL = require('../models/cache.model.js');
var AppConfig = require('../constants/appConfig');

exports.deleteKey = (req, res) => {

// function to insert/ update cache
const deleteKeyById = (MODEL, callback) => {

  if(!req.body.keyName) {
      return res.status(502).send({
          message: "Invalid keyName, please pass valid key_name"
      });
    }

  MODEL.remove({ keyName: req.body.keyName} )
  .then(function(resp, err) {
      if(!resp) {
        callback({ message  : "cache not found with the key " +req.body.keyName , status : 502 });
      }
      else{
        callback({ message  : "cache removed successfully with associated id " +req.body.keyName,  status : 200 });
      }

  }).catch(err => {
    console.log("error:::", err);
      if(err.kind === 'ObjectId') {
          return res.status(502).send({
              message: "Cache not found with key " + req.body.keyName
          });
      }
      return res.status(502).send({
          message: "Error updating note with key " + req.body.keyName
      });
  });
}

// final method to create / update
  deleteKeyById(MODEL, (data) => {
    if (data.status == 502){
      res.status(502).send(data);
    } else {
      res.status(200).send(data);
    }
  })

}
