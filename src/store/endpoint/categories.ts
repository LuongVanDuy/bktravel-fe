export default {
  fetchCategories: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")).toString()
      : "";
    return "tour/categories" + queryString;
  },
  fetchCategory: (id: string) => `tour/categories/${id}`,
  createCategory: () => "tour/categories",
  updateCategory: (id: string) => `tour/categories/${id}`,
  deleteCategory: (id: string) => `tour/categories/${id}`,
};
