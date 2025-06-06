export default {
  fetchUsers: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")).toString()
      : "";
    return "users" + queryString;
  },
  fetchUser: (id: string) => `users/${id}`,
  createUser: () => "users",
  updateUser: (id: string) => `users/${id}`,
  deleteUser: (id: string) => `users/${id}`,
  restoreUser: (id: string) => `users/${id}/restore`,
  hardDeleteUser: (id: string) => `users/${id}/permanent`,
};
