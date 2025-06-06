import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
});

export type AppStore = ReturnType<typeof configureStore>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];

export default store;
