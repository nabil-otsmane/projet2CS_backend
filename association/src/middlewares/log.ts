import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

/**
 * this middleware is used to log actions of this server to the log service
 */
export default function (_socket: Socket, next: (err?: ExtendedError | undefined) => void) {
    next();
}