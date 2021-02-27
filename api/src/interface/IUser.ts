import IBaseEntity from "./IBaseEntity";

export interface IUser extends IBaseEntity {
  _id?: string;
  userName: string;
  password: string;
}
