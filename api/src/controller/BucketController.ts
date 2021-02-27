import { IBucket } from "../interface/IBucket";
import { BucketService } from "../services/BucketService";
import { NextFunction, Request, Response } from "express";

export default class BucketController {
  private service: BucketService;

  constructor() {
    this.service = new BucketService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      global.logger.info("[BucketController.ts] [create] handler");
      const docs = await this.service.create(req.body as IBucket);
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
      const id = req?.params?.id as string;
      const model = req.body as IBucket;
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
}
