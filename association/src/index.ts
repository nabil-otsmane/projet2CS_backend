import * as dotenv from 'dotenv'
import { createServer } from 'http';
import { Connection, createConnection } from "typeorm";
import * as express from 'express';
import { createClient } from 'redis'
import * as cors from 'cors';
import * as morgan from 'morgan';
import { Server, ServerOptions } from 'socket.io'
import initConnection from './routes'
dotenv.config()
import { REDIS_SERVICE, REDIS_TOKEN } from './constants';


const app = express()

// using various middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// creating an http server to use with socket.io
const server = createServer(app);

// initialising socket.io server
const options: Partial<ServerOptions> = {
    path: "/socket",
};

const socket = new Server(server, options);
console.log(process.env.REDIS_SERVER)
const redisClient = createClient({
    host: REDIS_SERVICE,
    port: 6379,
    auth_pass: REDIS_TOKEN
});

initConnection(socket, app, redisClient);

// starting http server
createConnection()
    .then(async (_connection: Connection) => {
        server.listen(process.env.PORT || 8000, () => {
            console.log("server started.")
        })
    })
    .catch((error) => { console.log(error) })
