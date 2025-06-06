import { deleteWithToken, fetchWithToken, patchWithToken, postWithToken, putWithToken } from "@/helper/api";
import { FETCH_TOUR, FETCH_TOUR_FAILURE, FETCH_TOUR_SUCCESS, FETCH_TOURS, FETCH_TOURS_FAILURE, FETCH_TOURS_SUCCESS } from "../actionTypes";
import { AppDispatch } from "../store";
import tours from "../endpoint/tours";

interface ApiResponse {
  data?: any;
  message?: string;
}

export const fetchTours = (accessToken: any, option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_TOURS });
    fetchWithToken(tours.fetchTours(option), accessToken)
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

export const createTour = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    postWithToken(tours.createTour(), accessToken, payload)
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

export const fetchTour = (accessToken: any, id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_TOUR });
    fetchWithToken(tours.fetchTour(id), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_TOUR_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_TOUR_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const updateTour = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    putWithToken(tours.updateTour(payload.id), accessToken, payload.data)
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

export const deleteTour = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    deleteWithToken(tours.deleteTour(payload), accessToken)
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

export const restoreTour = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    patchWithToken(tours.restoreTour(payload), accessToken)
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

export const hardDeleteTour = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    deleteWithToken(tours.hardDeleteTour(payload), accessToken)
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
