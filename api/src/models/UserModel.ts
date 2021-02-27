import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "../interface/IUser";

const schema = new Schema({
  userName: String,
  password: String,
});

export type IUserDocument = Document & IUser;
export const userModel = mongoose.model<IUserDocument>("user", schema);
