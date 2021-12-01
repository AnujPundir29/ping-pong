const http = require('http');
const io = require('socket.io');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer);

const sockets = require('./sockets');

httpServer.listen(3000, () => {
    console.log('listening on port 3000')
});

sockets.listen(socketServer);