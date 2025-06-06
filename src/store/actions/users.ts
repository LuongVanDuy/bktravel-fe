import { deleteWithToken, fetchWithToken, patchWithToken, postWithToken, putWithToken } from "@/helper/api";
import { FETCH_USER, FETCH_USER_FAILURE, FETCH_USER_SUCCESS, FETCH_USERS, FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from "../actionTypes";
import { AppDispatch } from "../store";
import users from "../endpoint/users";

interface ApiResponse {
  data?: any;
  message?: string;
}

export const fetchUsers = (accessToken: any, option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_USERS });
    fetchWithToken(users.fetchUsers(option), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_USERS_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const createUser = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    postWithToken(users.createUser(), accessToken, payload)
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

export const fetchUser = (accessToken: any, id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_USER });
    fetchWithToken(users.fetchUser(id), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_USER_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const updateUser = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    putWithToken(users.updateUser(payload.id), accessToken, payload.data)
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

export const deleteUser = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    deleteWithToken(users.deleteUser(payload), accessToken)
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

export const restoreUser = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    patchWithToken(users.restoreUser(payload), accessToken)
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

export const hardDeleteUser = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    deleteWithToken(users.hardDeleteUser(payload), accessToken)
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
