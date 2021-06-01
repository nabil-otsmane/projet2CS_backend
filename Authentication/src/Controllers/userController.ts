import { NextFunction, Request, RequestHandler, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { User } from "../entity/Authentication";
import { getRepository } from "typeorm";
import { checkRole } from "../Middleware/checkRole";
import { generateToken } from "../Middleware/generateToken";

export class UserController {
  public signup = async (_req: Request, res: Response) => {
    try {
      console.log(_req.body);
      const user = await User.create({
        email: _req.body.email,
        password: _req.body.password,
        idUser: _req.body.idUser,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.idUser,
        },
      };

      const token = await generateToken(payload);

      res.status(201).json({
        token,
        user,
      });
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
      if (!isMatch) {
        return _res.status(400).json({
          message: "Incorrect Password !",
        });
      }

      const payload = {
        user: {
          id: user.idUser,
        },
      };

      const token = await generateToken(payload);
      _res.status(200).json({
        token,
        id: user.idUser,
      });
    } catch (e) {
      console.error(e);
      _res.status(500).json({
        message: "Server Error",
      });
    }
  };

  public check = async (req: Request, res: Response) => {
    let role = req.query.role;

    let checkR: RequestHandler = (_, _1, _2) => {};

    if (typeof role === "string") checkR = checkRole([role]);
    else if (typeof role === "object" && role.length) {
      checkR = checkRole(role as string[]);
    } else {
      res.status(400).json({
        message: "wrong query type of 'role'.",
      });
      return;
    }

    checkR(req, res, () => {
      res.status(200).json({
        auth: true,
      });
    });
  };

  public index = async (_: Request, res: Response) => {
    const userRepository = getRepository(User);

    const users = await userRepository.find();
    res.json(users);
  };

  public user = async (_: Request, res: Response) => {
    res.json(res.locals.jwtPayload);
  };

  public update = async (_req: Request, res: Response) => {
    const idUser = parseInt(_req.params.uuid);
    const { email, password } = _req.body;

    try {
      const user = await User.findOneOrFail({ idUser });

      user.email = email || user.email;
      user.password = password || user.password;

      await user.save();

      return res.status(200).json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };

  public delete = async (_req: Request, res: Response) => {
    const idUser = parseInt(_req.params.uuid);

    try {
      const user = await User.findOneOrFail({ idUser });
      await user.remove();

      return res.status(204).json({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
}
