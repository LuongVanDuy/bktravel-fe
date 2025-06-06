export default {
  fetchPayments: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")).toString()
      : "";
    return "payments" + queryString;
  },
  fetchPayment: (id: string) => `payments/${id}`,
  createPayment: () => "payments",
  updatePayment: (id: string) => `payments/${id}`,
  deletePayment: (id: string) => `payments/${id}`,
};
