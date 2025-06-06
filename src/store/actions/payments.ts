import { deleteWithToken, fetchWithToken, postWithToken, putWithToken } from "@/helper/api";
import {
  FETCH_PAYMENT,
  FETCH_PAYMENT_FAILURE,
  FETCH_PAYMENT_SUCCESS,
  FETCH_PAYMENTS,
  FETCH_PAYMENTS_FAILURE,
  FETCH_PAYMENTS_SUCCESS,
} from "../actionTypes";
import { AppDispatch } from "../store";
import payments from "../endpoint/payments";

interface ApiResponse {
  data?: any;
  message?: string;
}

export const fetchPayments = (accessToken: any, option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_PAYMENTS });
    fetchWithToken(payments.fetchPayments(option), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_PAYMENTS_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PAYMENTS_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const createPayment = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    postWithToken(payments.createPayment(), accessToken, payload)
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

export const fetchPayment = (accessToken: any, id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_PAYMENT });
    fetchWithToken(payments.fetchPayment(id), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_PAYMENT_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PAYMENT_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const updatePayment = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    putWithToken(payments.updatePayment(payload.id), accessToken, payload.data)
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

export const deletePayment = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    deleteWithToken(payments.deletePayment(payload), accessToken)
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
