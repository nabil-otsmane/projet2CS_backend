import "reflect-metadata";
import {createConnection} from "typeorm";

import express = require('express');
import { Request, Response, json } from "express";
import cors = require('cors');
import morgan = require ('morgan');
import Router from './routes';

const app = express()

app.use(json())
app.use(cors())
app.use(morgan("dev"))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(Router)

var s;

createConnection().then(async _connection => {   
    s = app.listen(8002, () => {
        console.log("geolocation service is up and running on port 8002!")
    });

}).catch(error => console.log(error));

export const server = s;
export default app;
