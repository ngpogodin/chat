const mongoose = require('mongoose');


const RoomSchema = mongoose.Schema({
    name: {type:String, require : true, unique: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    admins: [{type: mongoose.Schema.Types.ObjectId,  ref: 'User'}],
    messages: [Object],
    isClose: {type: Boolean, default: false}
});


module.exports = mongoose.model('Room', RoomSchema);