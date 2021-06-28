import { RedisClient } from 'redis';
import { Socket } from 'socket.io';
import { connect, openConnection, disconnect, closeConnection } from '../controllers/initialize';

export default function (redis: RedisClient) {
    
    return (socket: Socket) => {
        socket.on("connected vehicule", function (this: Socket, ...args) {
            connect.call(this, redis)(...args)
        });
    
        socket.on("demande vehicule", function (this: Socket, ...args) {
            openConnection.call(this, redis)(...args)
        });

        socket.on("end location", function (this: Socket, ...args) {
            closeConnection.call(this, redis)(...args)
        })
    
        socket.on("disconnect", function (this: Socket, ...args) { 
            disconnect.call(this, redis)(...args);
        })
    }
}