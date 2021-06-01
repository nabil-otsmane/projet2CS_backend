import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { getConnection } from "typeorm";

import { User } from "../entity/Authentication";
import { UserType } from "../entity/User";

export const checkRole = (roles: Array<string>) => {
  return async (_req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.user.id;

    //Get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);

      const userType = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(UserType, "user")
        .where("user.idUser = :id", { id: user.idUser })
        .getOne();

      console.log(userType?.userType);

      //Check if array of authorized roles includes the user's role
      if (userType != null) {
        if (roles.indexOf(userType.userType) > -1) next();
        else res.status(401).send();
      }
    } catch (id) {
      res.status(401).send();
    }
  };
};
