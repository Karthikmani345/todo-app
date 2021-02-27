import { IBucket } from "../interface/IBucket";
import { ITodo, ITodoViewModel } from "../interface/ITodo";
import { IAuth } from "../interface/IUser";
import { TODO_ACTION, BUCKET_ACTION, AUTH_ACTION } from "./Type";

const initBucketState: Readonly<{
  list: IBucket[];
  bucket: IBucket;
}> = {
  bucket: {
    _id: "",
    isActive: false,
    name: "",
  } as IBucket,
  list: [],
};

export function bucketReducer(
  state: Readonly<typeof initBucketState> = initBucketState,
  action: ActionAny<keyof typeof BUCKET_ACTION, IBucket | IBucket[]>
): typeof initBucketState {
  switch (action.type) {
    case "SET_BUCKET_LIST":
      return { ...state, list: state.list.concat(action.payload!) };
    case "UNSET_BUCKET_LIST":
      return { ...state, list: [] };
    case "SET_BUCKET":
      return { ...state, bucket: { ...(action.payload as IBucket) } };
    case "UNSET_BUCKET":
      return { ...state, bucket: { ...({} as IBucket) } };
    default:
      return { ...state };
  }
}

const initTodoState: Readonly<{
  list: ITodoViewModel[];
  todo: ITodo;
}> = {
  todo: {
    _id: "",
    bucketId: "",
    isAccomplished: false,
    name: "",
    bucketName: "",
  } as ITodo,
  list: [],
};

export function todoReducer(
  state: Readonly<typeof initTodoState> = initTodoState,
  action: ActionAny<
    keyof typeof TODO_ACTION,
    ITodo | ITodoViewModel | ITodoViewModel[]
  >
): typeof initTodoState {
  switch (action.type) {
    case "SET_TODO_LIST":
      return {
        ...state,
        list: state.list.concat(action.payload as ITodoViewModel[]),
      };
    case "UNSET_TODO_LIST":
      return { ...state, list: [] };
    // case "SET_TODO":
    //   return { ...state, todo: { ...(action.payload as ITodo) } };
    // case "UNSET_TODO":
    //   return { ...state, todo: { ...({} as ITodo) } };
    default:
      return { ...state };
  }
}

const initState: Readonly<IAuth> = {
  isAuthenticated: false,
  authInfo: {
    id: 0,
    userName: "",
    password: "",
  },
};

export const authReducer = (
  state: typeof initState = initState,
  action: ActionAny<keyof typeof AUTH_ACTION, IAuth>
): IAuth => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, ...action.payload };
    case "UNSET_AUTH":
      return initState;
    default:
      return state;
  }
};
