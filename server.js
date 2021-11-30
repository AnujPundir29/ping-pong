const server = require('http').createServer();
const express = require('express');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

server.listen(3000, () => {
    console.log('listening on port 3000')
});

io.on('connection', (socket) => {
    console.log('a user got connected '+socket.id);
})