import { ActionType, StateType } from "@/types";

import { FETCH_ORDERS, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, FETCH_ORDER, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAILURE } from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
};

const ordersReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data.data,
        total: action.payload.data.total,
        error: false,
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
    case FETCH_ORDER:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
        id: "",
      };
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_ORDER_FAILURE:
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

export default ordersReducer;
