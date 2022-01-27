const roomsModel = require('../models/roomModel');
const wsService = require('./wsService');



class WSController {
    constructor() {
        this.room
    }

    async enterRoom(wss,ws,msg) {
        try{
            this.room = await roomsModel.findById(ws.roomId);
            if(!this.room) throw new Error('room not exist');

            if(this.room.isClose) {
                if(!this.room.users.includes(ws.user.id)) throw new Error('user hasn`t access to the room');
            }

            const online = wsService.onlineInRoom(wss,ws);
            wsService.sendAll(wss,ws,{method: 'online', online});

            ws.send(JSON.stringify({method: 'history', data: this.room}));
            
            wsService.sendAll(wss,ws,{method: 'enter', username:ws.user.username});
        }catch(e) {
            console.log(e)
            ws.close(1003, e.message);
        }
    }
    async sendMsg(wss,ws,msg) {
        try{
            msg.messageObj.date = Date.now();
            wsService.sendAll(wss,ws, {method: 'msg', data: msg.messageObj});
            this.room.messages.push(msg.messageObj);
            this.room.save();
        }catch(e) {
            ws.close(1003)
        }
    }
}


module.exports =  WSController