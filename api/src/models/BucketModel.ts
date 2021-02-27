import mongoose, { Schema, Document } from "mongoose";

import { IBucket } from "../interface/IBucket";

const schema = new Schema({
  name: String,
  isActive: Boolean
});

export type IBucketDocument = Document & IBucket;
export const bucketModel = mongoose.model<IBucketDocument>("bucket", schema);
