import { RepositoryBase } from "../core/RepositoryBase";

import { bucketModel, IBucketDocument } from "../models/BucketModel";
import { IBucket } from "../interface/IBucket";

export interface IBucketRepository extends RepositoryBase<IBucketDocument> {
  findById(id: string): Promise<IBucketDocument>;
  find(): Promise<IBucketDocument[]>;
  save(model: IBucket): Promise<IBucketDocument>;
  update(id: string, model: IBucket): Promise<IBucketDocument>;
}

export class BucketRepository
  extends RepositoryBase<IBucketDocument>
  implements IBucketRepository {
  constructor() {
    super(bucketModel);
  }

  async findById(id: string): Promise<IBucketDocument> {
    return this._model.findById(id);
  }

  async find(): Promise<IBucketDocument[]> {
    return this._model.find();
  }

  async save(model: IBucket): Promise<IBucketDocument> {
    return this._model.create(model);
  }

  async update(id: string, model: IBucket): Promise<IBucketDocument> {
    return this._model.findByIdAndUpdate(id, model);
  }
}
