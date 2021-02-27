import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { bucketReducer, todoReducer, authReducer } from "../store/Reducer";

import { loadState, saveState } from "../shared/core/LocalStorage";
import { memoize } from "lodash";

// Combine all reducers
const rootReducers = combineReducers({
  bucket: bucketReducer,
  todo: todoReducer,
  auth: authReducer,
});

// Combine all middlewares
const middlewares = [thunk];

// dev tools for redux-devtools
// const composeEnhancers =
//   (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     realtime: true,
//     trace: true,
//     traceLimit: 25,
//   }) || compose;

// rehydrate the state by persiting from the local storage.
const persistedState = loadState() ?? {};

export const store = createStore(rootReducers,{ auth: persistedState }, applyMiddleware(...middlewares));

store.subscribe(() => {
  console.info("[Store.ts] subscribe");
  const persistState = store.getState();
  const saveStateMemo = memoize((authState) => {
    saveState(authState);
  });
  saveStateMemo(persistState.auth);
});

export type RootAction = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// store.subscribe(throttle(() => {
//     console.info('[Store.ts] subscribe');
//     const persistState = store.getState();
//     saveState(persistState.Auth);
// }, 10000));
