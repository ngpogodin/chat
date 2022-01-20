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
            ws.send(JSON.stringify({method: 'history', data: this.room}));

           wsService.sendAll(wss,ws,{method: 'enter', username:ws.username});
        }catch(e) {
            console.log(e)
            ws.close(1006)
        }
    }
    async sendMsg(wss,ws,msg) {
        try{
            msg.messageObj.date = Date.now();
            wsService.sendAll(wss,ws, {method: 'msg', data: msg.messageObj});
            this.room.messages.push(msg.messageObj);
            this.room.save();
        }catch(e) {
            ws.close(1008)
        }
    }
}


module.exports =  WSController