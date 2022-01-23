const { json } = require('express/lib/response');
const ApiError = require('../exceptions/ApiError');
const roomModel = require('../models/roomModel');
const roomService = require('../service/roomService');


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
    getAllRooms(req,res,next) {
        try{
            
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