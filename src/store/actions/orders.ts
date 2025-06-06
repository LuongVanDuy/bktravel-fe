import { deleteWithToken, fetchWithToken, patchWithToken, postWithToken, putWithToken } from "@/helper/api";
import { FETCH_ORDER, FETCH_ORDER_FAILURE, FETCH_ORDER_SUCCESS, FETCH_ORDERS, FETCH_ORDERS_FAILURE, FETCH_ORDERS_SUCCESS } from "../actionTypes";
import { AppDispatch } from "../store";
import orders from "../endpoint/orders";

interface ApiResponse {
  data?: any;
  message?: string;
}

export const fetchOrders = (accessToken: any, option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_ORDERS });
    fetchWithToken(orders.fetchOrders(option), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_ORDERS_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ORDERS_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const createOrder = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    postWithToken(orders.createOrder(), accessToken, payload)
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

export const fetchOrder = (accessToken: any, id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_ORDER });
    fetchWithToken(orders.fetchOrder(id), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_ORDER_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ORDER_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const updateOrder = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    putWithToken(orders.updateOrder(payload.id), accessToken, payload.data)
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

export const deleteOrder = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    deleteWithToken(orders.deleteOrder(payload), accessToken)
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

export const restoreOrder = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    patchWithToken(orders.restoreOrder(payload), accessToken)
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

export const hardDeleteOrder = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    deleteWithToken(orders.hardDeleteOrder(payload), accessToken)
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
