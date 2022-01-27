const ApiError = require('../exceptions/ApiError');
const roomModel = require('../models/roomModel');
const roomService = require('../service/roomService');
const GetService = require('../service/getService');
const RoomDto = require('../dtos/room-dto');


class RoomController {
    async createRoom(req,res,next) {
        try{
        const members = await roomService.findMembersAndUpdate(req.body.members);
        const admins = await roomService.findMembersAndUpdate(req.body.admins);
        const room = await roomModel.create({users:members,admins,name:req.body.name, isClose: req.body.isClose});
        res.json(room);

        }catch(e) {
            next(e);
        }
    }
    async getAllRooms(req,res,next) {
        try{
            const {limit = 10,offset = 1} = req.query;
            const arr = await new GetService(roomModel).getAll(limit,offset);
            const rooms = arr.map(room =>  new RoomDto(room).isCloseMethod());
            
            res.json({length:rooms.length, rooms});
        }catch(e) {
            next(e);
        }
    }
    async getByIdOrName(req,res,next) {
        try{
            const room = await roomService.findRoom(req.params.id)
            res.json(room);
        }catch(e) {
            next(e);
        }
    }
    async inviteToRoom(req,res,next) {
        try{
            const room = await roomService.findMembersAndUpdate(req.body.members,req.body.roomId);
            res.json(room);
        }catch(e) {
            next(e);
        }
    }
    async removeMember(req,res,next) {
        try{
            const members = await roomService.findMembersAndUpdate(req.body.members);
            const room = await roomModel.findByIdAndUpdate(req.body.roomId, {$pull: {users: {$in: members}}},{new:true});
            if(!room) throw ApiError.BadRequest('room not exist');            
            res.json(room)
        }catch(e) {
            next(e);
        }
    }
    async deleteRoom(req,res,next) {
        try{
            const room = await roomModel.findByIdAndDelete(req.params.id);
            res.json(room);
        }catch(e) {
            next(e);
        }
    }

}

module.exports = new RoomController();