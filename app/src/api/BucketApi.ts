import { baseUrl, uriConstants } from "./UriConstants";
import HttpRequest from "../shared/core/HttpRequest";
import { IBucket } from "../interface/IBucket";

export async function getAll() {
  try {
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.fetch<IBucket[]>(
      uriConstants.getAllBuckets,
      {}
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function get(id: number) {
  try {
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.fetch<IBucket>(
      `${uriConstants.getBucket}${id}`,
      {}
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function save(model: IBucket) {
  try {
    console.log("[BucketApi.ts] [save]", model);
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.create<IBucket>(
      uriConstants.saveBucket,
      model
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function update(id: string, model: IBucket) {
  try {
    console.log("[BucketApi.ts] [update]", model);
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.create<IBucket>(
      `${uriConstants.updateBucket}${id}`,
      model
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
