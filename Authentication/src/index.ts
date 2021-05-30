import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import * as express from "express";
import { json } from "express";
import * as cors from "cors";
import * as morgan from "morgan";

import { AuthenticationRoutes } from "./Routes/userRoutes";

const app = express();

let server;

app.use(json());
app.use(cors());
app.use(morgan("dev"));

let authenticationRoutes = new AuthenticationRoutes();
app.use(`/`, authenticationRoutes.router);

createConnection().then(async (_connection: Connection) => {
  server = app.listen(process.env.PORT || 8000, () => {
    console.log("Authentication Service Up 🚀");
  });
});

module.exports = server;
