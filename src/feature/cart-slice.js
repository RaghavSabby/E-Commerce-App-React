import { createSlice } from "@reduxjs/toolkit";

// This is the reducer
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: []
    }, 
    // defined a reducer
    reducers: {
        addToCart(state, action) {
            const { product, quantity=1 } = action.payload;
            const existingItem = state.value.find(({ product: prod }) => prod.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // this is immutable but we are modifying this using immerjs
                state.value.push(action.payload);
            }
        },
        removeFromCart(state, action) {
            const { product } = action.payload;
            const index = state.value.findIndex(({ product: prod }) => prod.id === product.id);
            if (index > -1) {
                const existingItem = state.value[index];
                if (existingItem.quantity === 1) {
                    state.value.splice(index, 1);
                } else {
                    existingItem.quantity -= 1;
                }
            }
        }, 
        clearCart(state) {
            state.value = []
        },
    }
});

// this is an action, so this should be used where you want to dispatch this action //.actions is creating the action creator automatically
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// this is will be used in store.js
export default cartSlice.reducer;