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

app.use(json());
app.use(cors());
app.use(morgan("dev"));
app.use("/notifDoc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(Router);

const PORT = 8000;

createConnection()
  .then(async (_connection: Connection) => {
    app.listen(PORT, () => {
        console.log(`Notification service is up working on port ${PORT}.`);
    });
  })
  .catch((error: Error) => console.log(error));
