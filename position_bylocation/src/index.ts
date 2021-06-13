import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import express = require('express');
import { Request, Response, json } from "express";
import cors = require('cors');
import morgan = require ('morgan');
import Router from './routes';

const app: express.Application = express();

app.use(json());
app.use(cors());
app.use(morgan("dev"));

app.use(Router);

createConnection();

const server = app.listen(8500, () => {
    console.log("This Service is Up 🚀");
});
  
module.exports = server;