import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import * as dotenv from "dotenv";
import * as express from "express";
import { json } from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import Router from "./routes";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

const app = express();

app.use(json());
app.use(cors());
app.use(morgan("dev"));
app.use("/agentTasks-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(Router);

createConnection()
  .then(async (_connection) => {
    const server = app.listen(8000, () => {
      console.log("Service gestion de tâche up 🚀");
    });
    module.exports = server;
  })
  .catch((error) => console.log(error));

// createConnection();

// const server = app.listen(8000, () => {
//   console.log("Server Started. 🚀 ");
// });

// module.exports = server;
