import { fetchApi, fetchWithToken, patchWithToken, postWithToken, putWithToken } from "@/helper/api";
import { AppDispatch } from "../store";
import auth from "../endpoint/auth";
import { PROFILE, PROFILE_FAILURE, PROFILE_SUCCESS } from "../actionTypes";

export const register = (payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    fetchApi(auth.register(), payload.data)
      .then((response) => {
        if (response) {
          onSuccess();
        }
      })
      .catch((error) => {
        const errorMessage = error && error.message ? error.message : "Unknown error";
        onFailure(errorMessage);
      });
  };
};

export const fetchProfile = (accessToken: any, id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: PROFILE });
    fetchWithToken(auth.fetchProfile(), accessToken)
      .then((response) => {
        dispatch({
          type: PROFILE_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: PROFILE_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const updateProfile = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    putWithToken(auth.updateProfile(), accessToken, payload)
      .then((response) => {
        if (response) {
          onSuccess();
        }
      })
      .catch((error) => {
        const errorMessage = error && error.message ? error.message : "Unknown error";
        onFailure(errorMessage);
      });
  };
};

export const changePassword = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    postWithToken(auth.changePassword(), accessToken, payload)
      .then((response) => {
        if (response) {
          onSuccess();
        }
      })
      .catch((error) => {
        const errorMessage = error && error.message ? error.message : "Unknown error";
        onFailure(errorMessage);
      });
  };
};
