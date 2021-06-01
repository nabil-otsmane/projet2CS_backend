import "reflect-metadata";
import {createConnection} from "typeorm";

import * as express from 'express';
import { Request, Response, json } from "express";
import * as cors from 'cors';
import * as morgan from 'morgan';
import Router from './routes'

const app = express()

app.use(json())
app.use(cors())
app.use(morgan("dev"))


app.use(json())


app.use(Router)

var server;

createConnection().then(async _connection => {   
    server = app.listen(8000, () => {
        console.log("server started.")
    });

    console.log(server == null);
    

}).catch(error => console.log(error));

module.exports = server;
