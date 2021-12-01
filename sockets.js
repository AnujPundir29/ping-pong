let countPlayer = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');  // only listen to pong namespace
    pongNamespace.on('connection', (socket) => {
        let room;
        console.log('a user got connected ' + socket.id);

        socket.on('ready', () => {
            room = `room ${Math.floor(countPlayer/2)}`;

            socket.join(room);  // creating a room and joining it
            
            console.log(`Player ${countPlayer+1} as ${socket.id} is ready!! in room ${room}`);

            countPlayer++;

            if (countPlayer % 2 === 0) {
                // broadcast start game to all clients
                // pongNamespace.emit('startGame', socket.id);

                //broadcast to a specific room
                pongNamespace.in(room).emit('startGame', socket.id);
            }
        });

        socket.on('paddleMove', (paddleData) => {
            // broadcast to all client except the sender    
            // socket.broadcast.emit('paddleMove', paddleData);

            //broadcast to a specific room
            socket.to(room).emit('paddleMove', paddleData);
        });

        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData);
        })

        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected because of ${reason}`);
            socket.leave(room)
        })
    })
}

module.exports = {
    listen
}