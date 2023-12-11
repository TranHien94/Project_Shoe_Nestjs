import { configureStore } from "@reduxjs/toolkit";
import CartReducer, { setCartFromLocalStorage } from "./slices/CartSlice";
import { useEffect } from "react";
import SearchReducer from './slices/SearchSlice'
import UserReducer from './slices/UserSlice'

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    search: SearchReducer,
    user: UserReducer
  },
});

// Use subscribe to listen for changes in the store
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  localStorage.setItem("localCart", JSON.stringify(state.cart));
});

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("localCart");
  if (storedCart) {
    const parsedCart = JSON.parse(storedCart);

    store.dispatch(setCartFromLocalStorage(parsedCart));
  }
};
loadCartFromLocalStorage();
