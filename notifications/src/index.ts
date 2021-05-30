/**
 * service : notification handler.
 *
 * descp   : this service allows CRUD operations on notification tables
 *           and notifies the user if a new notification arrived.
 *
 * use     : The sender emits an event "messageSent" which contains the
 *           message of the notification. The sender should also use the
 *           routes available on this service to save the notification in
 *           the database. Check the script on src/routes/index.html to see
 *           the code. 
 *
 * author  : Safi Rihani
 *          
 **/
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import * as express from "express";
import { json } from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import Router from "./routes/";

const app: express.Application = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(json());
app.use(cors());
app.use(morgan("dev"));

// create API doc on route /notifDoc
app.use("/notifDoc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(Router);

const PORT = 8000;

// start server and socket event listener
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    io.on("connection", (socket: any) => {
        socket.on("messageSent", (message: any) => {
            socket.broadcast.emit("messageSent", message);
        })
    })
})
