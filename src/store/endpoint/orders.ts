export default {
  fetchOrders: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")).toString()
      : "";
    return "orders" + queryString;
  },
  fetchOrder: (id: string) => `orders/${id}`,
  createOrder: () => "orders",
  updateOrder: (id: string) => `orders/${id}`,
  deleteOrder: (id: string) => `orders/${id}`,
  restoreOrder: (id: string) => `orders/${id}/restore`,
  hardDeleteOrder: (id: string) => `orders/${id}/permanent`,
};
