import { Server, Socket } from 'socket.io';

const socketHandler = (io: Server) => {
    console.log('4');
    // Handle incoming socket connections
    io.on('connection', (socket: any) => {
        console.log('7');
        console.log('A user connected.');

        // Handle incoming messages
        socket.on('message', (data: any) => {
            console.log(`message-${data}, user-${socket.id}`);
            // Broadcast the message to all connected clients
            io.emit('message', data);
        });

        // Handle disconnections
        socket.on('disconnect', () => {
            console.log('A user disconnected.');
        });
    });
};

export default socketHandler;
