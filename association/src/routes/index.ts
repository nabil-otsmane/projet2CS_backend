import { Express } from 'express'
import { RedisClient } from 'redis';
import { Server } from 'socket.io';
import { getConnections, redisErrorHandler } from '../controllers';
import getVehicules from '../controllers/getVehicules';
import { SocketAuth, Log, Auth } from '../middlewares'
import connection from './connection';

export default function (io: Server, app: Express, redis: RedisClient) {
    io.use(Log);
    io.use(SocketAuth);

    io.on('connection', connection(redis));

    redis.on("error", redisErrorHandler);

    app.get("/", Auth(["decision_maker", "technical_admin"]), async function (_req, res) {
        const result = await getConnections(redis)
        res.send(result);
    })

    app.get("/vehicules", Auth(["decision_maker", "account_admin", "technical_admin"]), async function (_req, res) {
        const result = await getVehicules(redis)
        res.send(result);
    })
};