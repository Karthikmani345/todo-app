import { NextFunction, Request, Response } from "express";

import { ITodo } from "../interface/ITodo";
import { TodoService } from "../services/TodoService";

export default class BucketController {
  private service: TodoService;

  constructor() {
    this.service = new TodoService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      global.logger.info("[BucketController.ts] [create] handler");
      const docs = await this.service.create(req.body as ITodo);
      global.logger.debug(`[BucketController.ts] [create] ${docs}`);
      if (docs) {
        res.send(docs);
      }
    } catch (error) {
      res.send(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      global.logger.info("[BucketController.ts] [create] handler");
      const id = req?.params?.id;
      const model = req.body as ITodo;
      const docs = await this.service.update(id, model);
      global.logger.debug(`[BucketController.ts] [create] ${docs}`);
      if (docs) {
        res.send(docs);
      }
    } catch (error) {
      res.send(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      global.logger.info("[BucketController.ts] [get] handler");
      const id = req?.params?.id;
      const docs = await this.service.get(id);
      global.logger.debug(`[BucketController.ts] [get] ${docs}`);
      if (docs) {
        res.send(docs);
      }
    } catch (error) {
      res.send(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      global.logger.info("[BucketController.ts] [get] handler");
      const docs = await this.service.getAll();
      global.logger.debug(`[BucketController.ts] [get] ${docs}`);
      if (docs) {
        res.send(docs);
      }
    } catch (error) {
      res.send(JSON.stringify(error));
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      global.logger.info("[BucketController.ts] [delete] handler");
      const id = req?.params?.id;
      const docs = await this.service.delete(id);
      global.logger.debug(`[BucketController.ts] [delete] ${docs}`);
      if (docs) {
        res.send(docs);
      }
    } catch (error) {
      res.send(error);
    }
  };
}
