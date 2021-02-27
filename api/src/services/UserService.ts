import { getCustomRepository } from "typeorm";

import { IUser } from "../interface/IUser";
import { UserRepository } from "../repository/UserRepository";

export interface IUserService {
  login(model: IUser): Promise<IUser>;
  create(model: IUser): Promise<IUser>;
}

export class UserService implements IUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(model: IUser): Promise<IUser> {
    try {
      const userRes = await this.userRepository.findByIdentity(model.userName);
      if (!userRes)
        throw new Error(`UserName : ${model.userName} does not exists`);

      if (userRes?.password !== model.password)
        throw new Error(`password is incorrect`);

      return userRes;
    } catch (error) {
      throw error;
    }
  }

  create(model: IUser): Promise<IUser> {
    return this.userRepository.save(model);
  }
}
