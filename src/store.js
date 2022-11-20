// created a store
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart-slice";
import productsReducer from "./feature/products-slice";
import categoriesReducer from "./feature/categories-slice";
import checkoutReducer from "./feature/checkout-slice";

export const store = configureStore({
    // interested in managing the state of the cart and wrote a reducer for that
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        categories: categoriesReducer,
        checkout: checkoutReducer,
    }
});