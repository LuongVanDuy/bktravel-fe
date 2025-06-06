import { ActionType, StateType } from "@/types";

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
} from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
};

const categoriesReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data.data,
        total: action.payload.data.total,
        error: false,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
        id: "",
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_CATEGORY_FAILURE:
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

export default categoriesReducer;
