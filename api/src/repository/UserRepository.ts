import { RepositoryBase } from "../core/RepositoryBase";

import { userModel, IUserDocument } from "../models/UserModel";
import { IUser } from "../interface/IUser";

export interface IUserRepository extends RepositoryBase<IUserDocument> {
  findByIdentity(identity: string): Promise<IUserDocument>;
  save(model: IUser): Promise<IUserDocument>;
}

export class UserRepository
  extends RepositoryBase<IUserDocument>
  implements IUserRepository {
  constructor() {
    super(userModel);
  }

  async findByIdentity(identity: string): Promise<IUserDocument> {
    return this._model.findOne({ userName: identity });
  }

  async save(model: IUser): Promise<IUserDocument> {
    return this._model.create(model);
  }
}
