import "reflect-metadata";
import {createConnection, Connection} from "typeorm";

import * as express from 'express';
import { Request, Response, json } from "express";
import * as cors from 'cors';
import * as morgan from 'morgan';
import Router from './routes'

const app = express()

app.use(json())
app.use(cors())
app.use(morgan("dev"))

app.use(Router)

createConnection().then(async _connection => {   
    const server = app.listen(8000, () => {
        console.log("server started. 🚀")
    }); 
    module.exports = server; 

}).catch(error => console.log(error));



// createConnection();

// const server = app.listen(8000, () => {
//   console.log("Server Started. 🚀");
// });

// module.exports = server;
