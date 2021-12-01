let countPlayer = 0;

function listen(io) {
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
}

module.exports = {
    listen
}