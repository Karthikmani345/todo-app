import { AUTH_ACTION, BUCKET_ACTION, TODO_ACTION } from "./Type";
import { RootAction, RootState } from "./Store";
import { IBucket } from "../interface/IBucket";
import { get, getAll, save, update } from "../api/BucketApi";
import {
  deleteTodo,
  get as getTodo,
  getAll as getAllTodo,
  save as saveTodo,
  update as updateTodo,
} from "../api/TodoApi";

import { login as loginApi, register } from "../api/AccountApi";
import { ITodo, ITodoViewModel } from "../interface/ITodo";
import { IAuth, IUser } from "../interface/IUser";
import { debug } from "console";

export function setBucketList(
  args: IBucket[]
): ActionAny<keyof typeof BUCKET_ACTION, IBucket[]> {
  return {
    type: "SET_BUCKET_LIST",
    payload: args,
  };
}

export function unsetBucketList(): ActionAny<
  keyof typeof BUCKET_ACTION,
  IBucket[]
> {
  return {
    type: "UNSET_BUCKET_LIST",
  };
}

export function setBucket(
  args: IBucket
): ActionAny<keyof typeof BUCKET_ACTION, IBucket> {
  return {
    type: "SET_BUCKET",
    payload: args,
  };
}

export function unsetBucket(): ActionAny<keyof typeof BUCKET_ACTION, IBucket> {
  return {
    type: "UNSET_BUCKET",
  };
}

export function setTodoList(
  args: ITodoViewModel | ITodoViewModel[]
): ActionAny<keyof typeof TODO_ACTION, ITodoViewModel | ITodoViewModel[]> {
  return {
    type: "SET_TODO_LIST",
    payload: args,
  };
}

export function unsetTodoList(): ActionAny<
  keyof typeof TODO_ACTION,
  ITodoViewModel[]
> {
  return {
    type: "UNSET_TODO_LIST",
  };
}

//#region  Action Creators

export function getBucketListAsync() {
  return async (dispact: RootAction) => {
    getAll()
      .then((res) => {
        dispact(unsetBucketList());
        dispact(setBucketList(res));
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
}

export function getBucketAsync(id: number) {
  return async (dispact: RootAction) => {
    dispact(unsetBucket());
    get(id)
      .then((res) => {
        dispact(setBucket(res));
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
}

export function saveBucketAsync(model: IBucket) {
  return async (dispact: RootAction | any) => {
    console.log("[Action.ts] [saveBucketAsync]", model);
    save(model)
      .then((res) => {
        console.log("[Action.ts] [saveBucketAsync] res :", res);
        dispact(unsetBucket());
        dispact(getBucketListAsync());
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
}

export function updateBucketAsync(id: string, model: IBucket) {
  return async (dispact: RootAction | any) => {
    console.log("[Action.ts] [updateBucketAsync]", id, model);
    update(id, model)
      .then((res) => {
        console.log("[Action.ts] [updateBucketAsync] res :", res);
        dispact(unsetBucket());
        dispact(getBucketListAsync());
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
}

export function submitBucketAsync(model: IBucket) {
  return async (dispact: RootAction | any) => {
    debugger;
    console.log("[Action.ts] [submitBucketAsync]", model._id, model);
    if (model._id) dispact(updateBucketAsync(model._id, model));
    else dispact(saveBucketAsync(model));
  };
}

export function getTodoListAsync() {
  return async (dispact: RootAction | any, getState: any) => {
    dispact(getBucketListAsync()).then(() => {
      getAllTodo()
        .then((todoRes) => {
          const globalState = getState() as RootState;
          const buckets = globalState.bucket.list;
          const viewModel: ITodoViewModel[] = buckets.map((bucket) => {
            const todos = todoRes.map((todo) => {
              return {
                ...todo,
                isAccomplished: JSON.parse(
                  (todo.isAccomplished as unknown) as string
                ),
              };
            });
            const list = todos.filter((todo) => todo.bucketId == bucket._id);
            return {
              bucketId: bucket._id,
              bucketName: bucket.name,
              TodoList: list,
            };
          });
          console.log("viewModel", viewModel);
          dispact(unsetTodoList());
          dispact(setTodoList(viewModel));
        })
        .catch((err: Error) => {
          console.log(err);
        });
    });
  };
}

export function saveTodoAsync(model: ITodo) {
  return async (dispact: RootAction | any) => {
    console.log("[Action.ts] [saveTodoAsync]", model);
    saveTodo(model)
      .then((res) => {
        console.log("[Action.ts] [saveTodoAsync] res :", res);
        dispact(getTodoListAsync());
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
}

export function updateTodoAsync(id: string, model: ITodo) {
  return async (dispact: RootAction | any) => {
    console.log("[Action.ts] [updateTodoAsync]", id, model);
    updateTodo(id, model)
      .then((res) => {
        console.log("[Action.ts] [updateTodoAsync] res :", res);
        dispact(getTodoListAsync());
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
}

export function submitTodoAsync(model: ITodo) {
  return async (dispact: RootAction | any) => {
    console.log("[Action.ts] [submitTodoAsync]", model._id, model);
    if (model._id) dispact(updateTodoAsync(model._id, model));
    else {
      delete model._id;
      dispact(saveTodoAsync(model));
    }
  };
}

export function deleteTodoAsync(id: string) {
  return async (dispact: RootAction | any) => {
    console.log("[Action.ts] [deleteTodoAsync]", id);
    deleteTodo(id)
      .then((res) => {
        console.log("[Action.ts] [deleteTodoAsync] res :", res);
        dispact(getTodoListAsync());
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
}

//#endregion

export function setAuth(
  args: IAuth
): ActionAny<keyof typeof AUTH_ACTION, IAuth> {
  return {
    type: "SET_AUTH",
    payload: args,
  };
}

export function unSetAuth(
  args?: IAuth
): ActionAny<keyof typeof AUTH_ACTION, IAuth> {
  return {
    type: "UNSET_AUTH",
    payload: args,
  };
}

export function login(
  model: IUser,
  done: (error: Error | null, res: any) => void
) {
  return async (dispact: RootAction) => {
    loginApi(model)
      .then((data: any) => {
        console.log(`[Action.ts][login] res : ${JSON.stringify(data)}`);
        if (data?.appCode > 0) {
          const AuthSession: IAuth = {
            isAuthenticated: true,
            authInfo: (data?.data as unknown) as IUser,
          };
          dispact(setAuth(AuthSession));
          done(null, data?.data);
        } else {
          done(new Error(data?.data), null);
        }
      })
      .catch((err: Error) => {
        console.log(`[Action.ts][login] err : ${err}`);
        dispact(unSetAuth());
        done(err, null);
      });
  };
}

export function signUp(
  formData: IUser,
  done: (error: Error | null, res: unknown) => void
) {
  return async (dispact: RootAction) => {
    register(formData)
      .then((data) => {
        console.log(`[Action.ts] [signUp] res : ${JSON.stringify(data)}`);
        done(null, data);
      })
      .catch((err: Error) => {
        console.log(`[Action.ts] [signUp] err : ${JSON.stringify(err)}`);
        done(err, null);
      });
  };
}
