

class WSService {
    sendAll(wss,ws,msg) {
        wss.clients.forEach((client) => {
            if (client.roomId === ws.roomId) {
                client.send(JSON.stringify(msg));
            }
        });
    }
}

module.exports = new WSService();