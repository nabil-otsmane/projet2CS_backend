import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import * as morgan from "morgan";

import { UserController } from "../Controllers/userController";
import { Router } from "express";

export class AuthenticationRoutes {
  private userController: UserController;
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * Method to configure the routes
   */
  public routes() {
    this.userController = new UserController();
    this.router.get("/", this.userController.index);
    this.router.post("/signup", this.userController.signup);
    this.router.post("/signin", this.userController.signin);
    this.router.put("/:uuid", this.userController.update);
    this.router.delete("/:uuid", this.userController.delete);
  }
}
