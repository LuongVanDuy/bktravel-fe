import { ActionType, StateType } from "@/types";

import { PROFILE, PROFILE_SUCCESS, PROFILE_FAILURE } from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
};

const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
        id: "",
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case PROFILE_FAILURE:
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

export default authReducer;
