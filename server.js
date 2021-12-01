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

let countPlayer = 0;

io.on('connection', (socket) => {
    console.log('a user got connected ' + socket.id);

    socket.on('ready', () => {
        console.log(`Player ${countPlayer+1} as ${socket.id} is ready!!`);

        countPlayer++;

        if (countPlayer % 2 === 0) {
            // broadcast start game to all clients
            io.emit('startGame', socket.id);
        }
    });

    socket.on('paddleMove', (paddleData) => {
        // broadcast to all client except the sender    
        socket.broadcast.emit('paddleMove', paddleData);
    });

    socket.on('ballMove', (ballData) => {
        socket.broadcast.emit('ballMove', ballData);
    })

    socket.on('disconnect', (reason) => {
        console.log(`Client ${socket.id} disconnected because of ${reason}`);
    })
})