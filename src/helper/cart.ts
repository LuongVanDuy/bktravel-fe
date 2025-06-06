export type TourCartItem = {
  tourId: number;
  date: string;
  qtyAdult?: number;
  qtyChild?: number;
  qtyBaby?: number;
};

const CART_KEY = "tour_cart";

export const getCart = (): TourCartItem[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const setCart = (cart: TourCartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const saveCart = (cart: TourCartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

export const addToCart = (item: TourCartItem) => {
  const cart = getCart();
  const index = cart.findIndex((c) => c.tourId === item.tourId && c.date === item.date);
  if (index >= 0) {
    cart[index] = item;
  } else {
    cart.push(item);
  }
  saveCart(cart);
};

export const removeFromCart = (tourId: number, date: string) => {
  const cart = getCart();
  saveCart(cart.filter((c) => !(c.tourId === tourId && c.date === date)));
};

export const clearCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_KEY);
  }
};
