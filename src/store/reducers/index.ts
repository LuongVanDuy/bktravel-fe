import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./users";
import toursReducer from "./tours";
import categoriesReducer from "./categories";
import ordersReducer from "./orders";
import paymentsReducer from "./payments";
import authReducer from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  tours: toursReducer,
  categories: categoriesReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
});

export default rootReducer;
