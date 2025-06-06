import { ActionType, StateType } from "@/types";

import { FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
};

const usersReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data.data,
        total: action.payload.data.total,
        error: false,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
    case FETCH_USER:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
        id: "",
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_USER_FAILURE:
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

export default usersReducer;
