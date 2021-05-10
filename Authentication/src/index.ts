import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { json } from "express";
import * as cors from "cors";
import * as morgan from "morgan";

import { AuthenticationRoutes } from "./Routes/userRoutes";

class Server {
  private authenticationRoutes: AuthenticationRoutes;
  private app: express.Application;

  constructor() {
    this.app = express(); // init the application
    this.configuration();
    this.routes();

    this.app.use(json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment
   * variables it takes the default port 8000
   */
  public configuration() {
    this.app.set("port", process.env.PORT || 8000);
  }

  /**
   * Method to configure the routes
   */
  public routes() {
    this.authenticationRoutes = new AuthenticationRoutes();
    this.app.use(`/`, this.authenticationRoutes.router); // Configure the new routes of the controller user
  }

  /**
   * Used to start the server
   */
  public async start() {
    await createConnection()
      .then(async (_connection) => {
        this.app.listen(8000, () => {
          console.log("server started.");
        });
      })
      .catch((error) => console.log(error));
  }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server
