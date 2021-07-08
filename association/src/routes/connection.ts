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
<<<<<<< HEAD

        socket.on("disconnect", function (this: Socket, ...args) {
=======
    
        socket.on("disconnect", function (this: Socket, ...args) { 
>>>>>>> a228cfe4620dc7f815401f8bb9f08d51d33beef2
            disconnect.call(this, redis)(...args);
        })
    }
}
