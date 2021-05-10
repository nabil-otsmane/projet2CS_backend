import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

<<<<<<< HEAD:adminagentapi/src/index.ts
import * as express from 'express';
import { Request, Response, json } from "express";
import * as cors from 'cors';
import * as morgan from 'morgan';
import Router from './routes'
=======
import * as express from "express";
import { json } from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import Router from "./routes/";
>>>>>>> ff23e99bdeabc0dae99abec97bbfcb6089c547d6:template/src/index.ts

const app: express.Application = express();

app.use(json());
app.use(cors());
app.use(morgan("dev"));

<<<<<<< HEAD:adminagentapi/src/index.ts

app.use(json())


app.use(Router)
=======
app.use(Router);
>>>>>>> ff23e99bdeabc0dae99abec97bbfcb6089c547d6:template/src/index.ts

createConnection()
  .then(async (_connection: Connection) => {
    app.listen(8000, () => {
      console.log("server started.");
    });
  })
  .catch((error: Error) => console.log(error));
