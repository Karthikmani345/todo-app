import { baseUrl, uriConstants } from "./UriConstants";
import HttpRequest from "../shared/core/HttpRequest";
import { ITodo } from "../interface/ITodo";

export async function getAll() {
  try {
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.fetch<ITodo[]>(uriConstants.getAllTodos, {});
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function get(id: number) {
  try {
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.fetch<ITodo>(
      `${uriConstants.getBucket}${id}`,
      {}
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function save(model: ITodo) {
  try {
    console.log("[BucketApi.ts] [save]", model);
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.create<ITodo>(uriConstants.saveTodo, model);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function update(id: string, model: ITodo) {
  try {
    console.log("[BucketApi.ts] [update]", model);
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.create<ITodo>(
      `${uriConstants.updateTodo}${id}`,
      model
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTodo(id: string) {
  try {
    console.log("[BucketApi.ts] [delete]", id);
    const httpRequest = new HttpRequest(baseUrl);
    const res = await httpRequest.create<ITodo>(
      `${uriConstants.deleteTodo}${id}`,
      {}
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
