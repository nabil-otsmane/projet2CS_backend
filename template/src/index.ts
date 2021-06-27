import "reflect-metadata";
import {createConnection} from "typeorm";

import * as express from 'express';
import { Request, Response, json } from "express";
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as BodyParser from 'body-parser';
import Router from './routes/'

const app = express()


app.use(json())
app.use(cors())
app.use(morgan("dev"))

app.use(Router)

createConnection().then(async _connection => {   
    app.listen(5000, () => {
        console.log("server started.")
    })
    

}).catch(error => console.log(error));
