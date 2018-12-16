
module.exports = (app) => {

    const create_update_cache = require('../controllers/createCache.controller.js');
    const get_key             = require('../controllers/getKeys.controller.js');
    const delete_cache        = require('../controllers/deleteCacheById.controller.js');
    const deleteAll_cache     = require('../controllers/deleteCache.controller.js');
    const getCacheById        = require('../controllers/getKeyById.controller.js');

    // Create Cache
    app.post('/api/createCache', create_update_cache.createCache);
    // Get all getKeys
    app.get('/api/getKeys', get_key.getKeys);
    // Update Cache
    app.post('/api/updateCache', create_update_cache.createCache);
    // delete cache by ID
    app.post('/api/deleteCache', delete_cache.deleteKey);
    // delete All keys
    app.get('/api/deleteCache', deleteAll_cache.deleteKeys);
    // get cache by ID
    app.post('/api/getCacheByID', getCacheById.getKeyById);

}
