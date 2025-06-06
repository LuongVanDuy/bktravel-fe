import { ApiResponse } from "@/types";

export async function fetchApi(endpoint: string, method: string, body: any = null) {
  const url = `${process.env.apiUrl}/${endpoint}`;

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
}

export const fetchWithToken = async (url: string, token: string, callback: ((data: ApiResponse) => void) | null = null): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.apiUrl}/${url}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.message || "Unknown error";
    throw new Error(errorMessage);
  }

  const data = await response.json();
  if (callback && typeof callback === "function") {
    callback(data);
  }
  return data;
};

export const fetchNoToken = async (url: string, callback: ((data: ApiResponse) => void) | null = null): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.apiUrl}/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.message || "Unknown error";
    throw new Error(errorMessage);
  }

  const data = await response.json();
  if (callback && typeof callback === "function") {
    callback(data);
  }

  return data;
};

export const postWithToken = async (
  url: string,
  token: string,
  body: any,
  callback: ((data: ApiResponse) => void) | null = null
): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.apiUrl}/${url}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.message || "Unknown error";
    throw new Error(errorMessage);
  }

  const data = await response.json();
  if (callback) {
    callback(data);
  }
  return data;
};

export const putWithToken = async (
  url: string,
  token: string,
  body: any,
  callback: ((data: ApiResponse) => void) | null = null
): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.apiUrl}/${url}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.message || "Unknown error";
    throw new Error(errorMessage);
  }

  const data = await response.json();
  if (callback) {
    callback(data);
  }
  return data;
};

export const deleteWithToken = async (url: string, token: string, callback: ((data: ApiResponse) => void) | null = null): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.apiUrl}/${url}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.message || "Unknown error";
    throw new Error(errorMessage);
  }

  const data = await response.json();
  if (callback && typeof callback === "function") {
    callback(data);
  }
  return data;
};

export const patchWithToken = async (
  url: string,
  token: string,
  body: any = {},
  callback: ((data: ApiResponse) => void) | null = null
): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.apiUrl}/${url}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.message || "Unknown error";
    throw new Error(errorMessage);
  }

  const data = await response.json();
  if (callback && typeof callback === "function") {
    callback(data);
  }
  return data;
};
