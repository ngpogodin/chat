const SwitchCases = require('./wsSwitch');



class WSEvent {
    constructor() {
        this.switchCases = new SwitchCases()
    }
    event(wss,ws) {
        ws.on('close', (code,reason) => {
            console.log(code, reason)
        })
        ws.on("message", (message) => {
            const msg = JSON.parse(message);
            this.switchCases.switch(wss, ws, msg)
        });
    }
}


module.exports =  WSEvent