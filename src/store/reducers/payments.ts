import { ActionType, StateType } from "@/types";

import {
  FETCH_PAYMENTS,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  FETCH_PAYMENT,
  FETCH_PAYMENT_SUCCESS,
  FETCH_PAYMENT_FAILURE,
} from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
};

const paymentsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_PAYMENTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data.data,
        total: action.payload.data.total,
        error: false,
      };
    case FETCH_PAYMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
    case FETCH_PAYMENT:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
        id: "",
      };
    case FETCH_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        detail: {},
      };
    default:
      return state;
  }
};

export default paymentsReducer;
