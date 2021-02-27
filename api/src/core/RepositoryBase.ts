import mongoose from "mongoose";

// tslint:disable-next-line
export interface IRepositoryBase<T extends mongoose.Document> {}

export abstract class RepositoryBase<T extends mongoose.Document>
  implements IRepositoryBase<T> {
  public _model: mongoose.Model<T>;

  constructor(schemaModel: mongoose.Model<T>) {
    this._model = schemaModel;
  }
}
