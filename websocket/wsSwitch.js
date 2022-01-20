const WSController = require('./wsControllers')

class SwitchCases {
    constructor() {
        this.wsController = new WSController()
    }
    switch(wss, ws, msg) {
        switch (msg.method) {
            case 'enter':
                this.wsController.enterRoom(wss,ws,msg);
                break;
            case 'msg':
                this.wsController.sendMsg(wss,ws,msg)
                break;
        }
    }
}



module.exports =  SwitchCases
