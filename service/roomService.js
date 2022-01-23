const roomModel = require('../models/roomModel');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const RoomDto = require('../dtos/room-dto');
const ApiError = require('../exceptions/ApiError')

class RoomService {
    async findMembersAndUpdate(membersArr, roomId) {
        const membersId = [];
        for(let username of membersArr) {
            const id = await userModel.findOne({username}).select('_id');
            if(!id) continue;
            membersId.push(id._id)
        }
        if(!roomId) return membersId;

        const room = await roomModel.findByIdAndUpdate(roomId, {$addToSet: {users: membersId}}, {new: true})
        if(!room) throw ApiError.BadRequest('room not exist');

        return new RoomDto(room);
    }

    
    async findRoom(idOrName) {
        if(mongoose.isValidObjectId(idOrName)) {
            const room = await roomModel
                                    .findById(idOrName)
                                    .populate({path:'users', select:'username'})
                                    .populate({path:'admins', select:'username'});
            if(!room) throw ApiError.BadRequest('room not exist');

            return new RoomDto(room).isCloseMethod();
        }

        const room = await roomModel
                                .findOne({name:idOrName})
                                .populate({path:'users', select:'username'})
                                .populate({path:'admins', select:'username'});


        if(!room) throw ApiError.BadRequest('room not exist');
        
        return new RoomDto(room).isCloseMethod();
    }

    
} 

module.exports = new RoomService();