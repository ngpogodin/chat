const SwitchCases = require('./wsSwitch');
const wsService = require('./wsService');



class WSEvent {
    constructor() {
        this.switchCases = new SwitchCases();
        this.interval
    }

    event(wss,ws) {
        ws.on('close', (code,reason) => {
            console.log(code, reason)
            clearInterval(this.interval)
            const online = wsService.onlineInRoom(wss,ws);
            wsService.sendAll(wss,ws,{method: 'online', online});
        })
        ws.on("message", (message) => {
            const msg = JSON.parse(message);

            if(msg.method === 'enter') {
                this.interval = wsService.setPing(ws);
            }
            
            this.switchCases.switch(wss, ws, msg);
        });
        ws.on('pong', () => {
            ws.isAlive = true;
        } )
    }
}


module.exports =  WSEvent