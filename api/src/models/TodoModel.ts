import mongoose, { Schema, Document } from "mongoose";

import { ITodo } from "../interface/ITodo";

export const schema = new Schema({
  bucketId: Schema.Types.ObjectId,
  name: String,
  isAccomplished: {
    type: Boolean,
    default: false,
  },
});

export type ITodoDocument = Document & ITodo;
export const todoModel = mongoose.model<ITodoDocument>("todo", schema);
