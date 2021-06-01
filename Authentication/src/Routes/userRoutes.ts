import "reflect-metadata";

import { UserController } from "../Controllers/userController";
import { Router } from "express";

import { checkJwt } from "../Middleware/checkJwt";
import { checkRole } from "../Middleware/checkRole";

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
    this.router.get("/user", [checkJwt], this.userController.user)
    this.router.get("/check", [checkJwt], this.userController.check);
    this.router.post("/signup", this.userController.signup);
    this.router.post("/signin", this.userController.signin);
    this.router.put("/:uuid", this.userController.update);
    this.router.delete("/:uuid", this.userController.delete);
  }
}
