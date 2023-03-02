const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true},
    // @todo other fields
    // @todo unique
});

module.exports = mongoose.model('User', UserSchema);