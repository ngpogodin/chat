const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type:String, require: true, unique: true},
    hash: {type:String, require: true},
    roomsList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}],
    salt: String,
})

module.exports = mongoose.model('User', UserSchema);