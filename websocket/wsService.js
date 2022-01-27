

class WSService {
    sendAll(wss,ws,msg) {
        wss.clients.forEach((client) => {
            if (client.roomId === ws.roomId) {
                client.send(JSON.stringify(msg));
            }
        });
    }
    onlineInRoom(wss,ws) {
        const onlineMembers = [];
        wss.clients.forEach(client => {
            if(client.roomId === ws.roomId) {
                onlineMembers.push(client.user.username);
            }
        })
        return onlineMembers
    }
    setPing(ws) {
        return setInterval( () => {
            console.log('ws')
            if (ws.isAlive === false) return ws.terminate();
            ws.isAlive = false;
            ws.ping();        
       }, 30000);
    }
}

module.exports = new WSService();