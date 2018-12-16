const mongoose = require('mongoose');

const SignUpSchema = mongoose.Schema({
    cacheKey   :   String,
    keyName    :   String,
    ttl        :   String,
    lastUsage  :   String,
    status     :   Boolean
}, {timestamps :   true});

module.exports = mongoose.model('cache', SignUpSchema);
