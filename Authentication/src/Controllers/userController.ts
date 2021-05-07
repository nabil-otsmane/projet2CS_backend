import { Router, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { User } from "../entity/Authentication";

export class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public signup = async (_req: Request, res: Response) => {
    try {
      const user = await User.create({
        email: _req.body.email,
        password: _req.body.password,
        role: _req.body.role,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            token,
            user,
          });
        }
      );
    } catch (err) {
      console.log(err);
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  };

  public signin = async (_req: Request, _res: Response) => {
    try {
      let user = await User.findOneOrFail({
        email: _req.body.email,
      });
      if (!user)
        return _res.status(404).json({
          message: "user Not Exist",
        });

      const isMatch = await bcrypt.compare(_req.body.password, user.password);
      if (!isMatch)
        return _res.status(400).json({
          message: "Incorrect Password !",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          _res.status(200).json({
            token,
          });
        }
      );
    } catch (e) {
      console.error(e);
      _res.status(500).json({
        message: "Server Error",
      });
    }
  };

  public index = async (_: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
  };

  public update = async (_: Request, res: Response) => {
    res.send("Update");
  };

  public delete = async (_: Request, res: Response) => {
    res.send("Delete");
  };

  public routes() {
    this.router.get("/", this.index);
    this.router.post("/signup", this.signup);
    this.router.post("/signin", this.signin);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}