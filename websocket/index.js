const WebSocket = require('ws');
const tokenService = require('../service/tokenService');
const WSEvent = require('./wsEvent')
const queryString = require('querystring');

module.exports = (server) => {
    const websocketServer = new WebSocket.Server({
        noServer: true,
    });


    server.on("upgrade", (req, socket, head) => {
        websocketServer.handleUpgrade(req, socket, head, (ws) => {
            websocketServer.emit("connection", ws, req)
        });
    });

    websocketServer.on('connection', async (ws,req)  => {
        const [_path, params] = req?.url?.split("?");
        const objParams = queryString.parse(params);
        const access = await tokenService.validateAccess(objParams.accessToken);
        if(!access) ws.close(1008, 'accessToken is invalid');
        ws.user = access;
        ws.isAlive = true;

        const arr = ['roomId'];
        arr.forEach(el => {
            if(!objParams[el]) ws.close(1008, 'exist ' + el);
            ws[el] = objParams[el];
        })
        const wsEvent = new WSEvent();
        wsEvent.event(websocketServer,ws);
    })
    return websocketServer;
}