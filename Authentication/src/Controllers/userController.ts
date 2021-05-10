import { Router, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { User } from "../entity/Authentication";

export class UserController {
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

  public update = async (_req: Request, res: Response) => {
    const uuid = _req.params.uuid;
    const { email, password, role } = _req.body;

    try {
      const user = await User.findOneOrFail({ uuid });

      user.email = email || user.email;
      user.password = password || user.password;
      user.role = role || user.role;

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
    const uuid = _req.params.uuid;

    try {
      const user = await User.findOneOrFail({ uuid });

      await user.remove();

      return res.status(204).json({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
}
