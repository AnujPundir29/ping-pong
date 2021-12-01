const api = require('./api');
const http = require('http');
const io = require('socket.io');
const httpServer = http.createServer(api);
const sockets = require('./sockets');
const socketServer = io(httpServer, {
    cors: {
        origin: '*',
    }
});

socketServer.listen(3000, () => {
    console.log('listening on port 3000')
});

sockets.listen(io);