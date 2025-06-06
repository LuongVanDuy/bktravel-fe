import { deleteWithToken, fetchWithToken, postWithToken, putWithToken } from "@/helper/api";
import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
} from "../actionTypes";
import { AppDispatch } from "../store";
import categories from "../endpoint/categories";

interface ApiResponse {
  data?: any;
  message?: string;
}

export const fetchCategories = (accessToken: any, option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_CATEGORIES });
    fetchWithToken(categories.fetchCategories(option), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_CATEGORIES_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const createCategory = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    postWithToken(categories.createCategory(), accessToken, payload)
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

export const fetchCategory = (accessToken: any, id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_CATEGORY });
    fetchWithToken(categories.fetchCategory(id), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_CATEGORY_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_CATEGORY_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const updateCategory = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    putWithToken(categories.updateCategory(payload.id), accessToken, payload.data)
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

export const deleteCategory = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    deleteWithToken(categories.deleteCategory(payload), accessToken)
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
