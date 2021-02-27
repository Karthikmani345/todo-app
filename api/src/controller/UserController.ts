import { NextFunction, Request, Response } from "express";

import { IUser } from "../interface/IUser";
import { UserService } from "../services/UserService";

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      global.logger.info(
        `[UserController.ts] [login] handler ${JSON.stringify(req.body)}`
      );
      const docs = await this.service.login(req.body as IUser);
      global.logger.debug(
        `[UserController.ts] [login] ${JSON.stringify(docs)}`
      );
      if (docs) {
        res.send({
          appCode: 1,
          data: docs,
        });
      }
    } catch (error) {
      global.logger.error(
        `[UserController.ts] [login] ${JSON.stringify(error)}`
      );
      res.send({
        appCode: -1,
        data: error.message,
      });
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      global.logger.info(
        `[UserController.ts] [register] handler ${JSON.stringify(req.body)}`
      );
      const docs = await this.service.create(req.body as IUser);
      global.logger.debug(
        `[UserController.ts] [register] ${JSON.stringify(docs)}`
      );
      if (docs) {
        res.send(docs);
      }
    } catch (error) {
      global.logger.error(
        `[UserController.ts] [register] ${JSON.stringify(error)}`
      );
      res.status(500).send(error);
    }
  };
}
