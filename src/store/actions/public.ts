import { deleteWithToken, fetchNoToken, fetchWithToken, patchWithToken, postWithToken, putWithToken } from "@/helper/api";
import { FETCH_TOUR, FETCH_TOUR_FAILURE, FETCH_TOUR_SUCCESS, FETCH_TOURS, FETCH_TOURS_FAILURE, FETCH_TOURS_SUCCESS } from "../actionTypes";
import { AppDispatch } from "../store";
import tours from "../endpoint/tours";

interface ApiResponse {
  data?: any;
  message?: string;
}

export const fetchPublicTours = (option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_TOURS });
    fetchNoToken(tours.fetchPublicTours(option))
      .then((response) => {
        dispatch({
          type: FETCH_TOURS_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_TOURS_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const fetchPublicTourByIds = (option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_TOURS });
    fetchNoToken(tours.fetchPublicTourByIds(option))
      .then((response) => {
        dispatch({
          type: FETCH_TOURS_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_TOURS_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};
