import { fetchPublicTourByIds } from "../actions/public";

export default {
  fetchTours: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")).toString()
      : "";
    return "tours" + queryString;
  },
  fetchTour: (id: string) => `tours/${id}`,
  createTour: () => "tours",
  updateTour: (id: string) => `tours/${id}`,
  deleteTour: (id: string) => `tours/${id}`,
  restoreTour: (id: string) => `tours/${id}/restore`,
  hardDeleteTour: (id: string) => `tours/${id}/permanent`,

  fetchPublicTours: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")).toString()
      : "";
    return "public/tours" + queryString;
  },

  fetchPublicTourByIds: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")).toString()
      : "";
    return "public/tours/by-ids" + queryString;
  },
};
