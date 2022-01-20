const mongoose = require('mongoose');


const RoomSchema = mongoose.Schema({
    name: {type:String, require : true, default: 'noname'},
    users: [{type: mongoose.Schema.Types.ObjectId}],
    messages: [Object],
});


module.exports = mongoose.model('Room', RoomSchema);