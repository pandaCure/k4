import { createStore, applyMiddleware } from "redux";
import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  fork,
} from "redux-saga/effects";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const blockMidd: any = (store: any) => {
  return (next: any) => {
    console.log("11111111111111111111111111111", "first next");
    return (action: any) => {
      console.log("11111111111111111111111111111", "first action");
      return new Promise((resolve, reject) => {
        return next({
          __HAHA: resolve,
          __KUKU: reject,
          ...action,
        });
      });
    };
  };
};
const testBlock: any = (store: any) => {
  return (next: any) => {
    console.log("22222222222222222222222222222222222", "second next");

    return (action: any) => {
      console.log("22222222222222222222222222222222222", "second action");

      console.log(next);
      console.log(action);
      return next(action);
    };
  };
};
// const middleware = [testBlock, blockMidd];

// if (process.env.NODE_ENV !== "production") {
//   middleware.push(createLogger());
// }
const reducer = (state = { age: 10 }, action: any) => {
  switch (action.type) {
    case "zzy":
      return {
        ...state,
        age: 20,
      };
    default:
      return {
        ...state,
      };
  }
};
// const store = createStore(reducer, applyMiddleware(...middleware));
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(reducer, applyMiddleware(blockMidd, sagaMiddleware));
function* aaa() {
  console.log(arguments);
  yield put({
    type: "zzy",
  });
  yield select((state) => console.log(state));
}
function* mySaga() {
  yield fork("USER_FETCH_REQUESTED", aaa);
}
// then run the saga
sagaMiddleware.run(mySaga);
const a = store.dispatch({
  type: "USER_FETCH_REQUESTED",
});
const aas = store.dispatch({
  type: "USER_FETCH_REQUESTED",
});
console.log(a);
console.log(store.getState());
