import { ActionType, StateType } from "@/types";

import { FETCH_TOURS, FETCH_TOURS_SUCCESS, FETCH_TOURS_FAILURE, FETCH_TOUR, FETCH_TOUR_SUCCESS, FETCH_TOUR_FAILURE } from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
};

const toursReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_TOURS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TOURS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data.data,
        total: action.payload.data.total,
        error: false,
      };
    case FETCH_TOURS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
    case FETCH_TOUR:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
        id: "",
      };
    case FETCH_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_TOUR_FAILURE:
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

export default toursReducer;
