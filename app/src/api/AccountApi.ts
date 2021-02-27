import { baseUrl, uriConstants } from "./UriConstants";
import HttpRequest from "../shared/core/HttpRequest";
import { IUser } from "../interface/IUser";

export async function login(model: IUser) {
  try {
    console.log("[AccountApi.ts] [login]", model);
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.create<IUser>(uriConstants.login, model);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function register(model: IUser) {
  try {
    console.log("[AccountApi.ts] [register]", model);
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.create<IUser>(uriConstants.register, model);
    return res.data;
  } catch (error) {
    throw error;
  }
}
