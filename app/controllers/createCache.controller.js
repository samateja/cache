const NodeCache = require( "node-cache" );
const myCache = new NodeCache({stdTTL: 100, checkperiod: 2});
// Load model from models
const MODEL = require('../models/cache.model.js');
var AppConfig = require('../constants/appConfig');

exports.createCache = (req, res) => {

var key_name, count = 0, keys = [];

var maximum_stack_size = 3; // increase the stack size if needed.

if(!req.body.keyName) {
    return res.status(400).send({
        message: "please pass keyName."
    });
} else {
  key_name = req.body.keyName;
}


// Limiting the entries of cache by setting maximum to 10 dcouments.

// Old entry cache field will be reset based on last updated date, on a scale of 1 to n if any of the record get updated
// the record will take the nth position and the previous one will be at n-1, by reseting every 5 records the whole stack gets updated.

// Using "mycache" regenerate cache with random string upon expire of time call update to regenerate token. Time can be changed from APP Config.

// get count of all documents.
const getCount = (MODEL, callback) => {

  MODEL.countDocuments({}).then(function(resp, err) {
      if(resp < maximum_stack_size) {
        callback({ message  : "create cache", status: true });
      }
      else{
        callback({ message  : "Cache limit exceded, please delete cache", status:false });
      }

  }).catch(err => {
    console.log("error:::", err);
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Error while createing cache " + req.body.keyName
          });
      }
      return res.status(500).send({
          message: "Error updating cache " + req.body.keyName
      });
  });
}

// Get the old entries of cache

const resetOldCache = (MODEL, callback) => {

  MODEL.find({}).sort({updatedAt: -1}).then(function(resp, err) {
      if(resp) {
        callback({ message  : "get records based on created Date", keys:resp, status: true });
      }
      else{
        callback({ message  : "No cache found, please create one", status:false });
      }

  }).catch(err => {
    console.log("error:::", err);
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Error while createing cache " + req.body.keyName
          });
      }
      return res.status(500).send({
          message: "Error updating cache " + req.body.keyName
      });
  });

}

// function to insert/ update cache
const createCache = async function (MODEL, key, callback ) {

await new Promise(async function(fulfill, reject) {

  var randomString = await getRandomString();

  myCache.set( key, randomString, AppConfig.TIMER );

  var query = {keyName:key},
      update = { 'cacheKey':randomString,'status':true, ttl: AppConfig.TIMER },
      options = { upsert: true, returnNewDocument : true };

  await MODEL.findOneAndUpdate(query, update, options)
    .then(async function(resp, err) {
        if(!resp) {
          fulfill();
          callback({ message  : "Cache miss", cacheKey : randomString, status: 200 });
        }
        else{
          fulfill();
          callback({ message  : "Cache hit", cacheKey : randomString, status:200 });
        }

    }).catch(err => {
      console.log("error:::", err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cache not found with key " + req.body.keyName
            });
        }
        reject();
        return res.status(500).send({
            message: "Error updating cache with key " + req.body.keyName
        });
    });
  });
}

// update cache on expiry or old entry or stack is full.
const updateCache = async function (data, callback) {

  for (var i=0; i < maximum_stack_size - 1; i++){
    keys.push(data[i].keyName);
    await createCache(MODEL, data[i].keyName, (data) => {
        console.log("data after updating:::", data);
        count ++;
     })
  }
  if (count === 2){
    callback({ message  : "Cache stack reached.Following old entry caches are reset", cache:keys, status:200 });
  }
}

// generate a random string.
async function getRandomString(){
  return Math.random().toString(36).substring(3);
}

// Call update method on Expire
const keyExpire = myCache.on("expired", function( key, value ){
  console.log("key expired:::" + key);
  var val = [{'keyName' : key}];
  updateCache(val, (data) => {
    console.log("cache updated with latest key");
  })
});

// final method to create / update
  getCount(MODEL, (data) => {
    if (data.status === false){
      resetOldCache(MODEL, (data) => {
          updateCache(data.keys, (data) => {
            res.status(200).send(data);
        })
      })
    }else{
     createCache(MODEL, key_name, (data) => {
        res.status(200).send(data);
      })
    }
  })
}
