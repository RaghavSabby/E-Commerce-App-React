import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Reducers are synchronous in nature. Use createAsyncthunk (it dispatches a async action, when this action is available it will dispatch another action which will modify the state)
// "products/fetchAll" is the type of the action which will get dispatch
export const fetchAllProducts = createAsyncThunk("products/fetchAll", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
})

const productsSlice = createSlice({
    name: "products",
    initialState: {
        value: [], 
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.value = action.payload;
            state.loading = false;
        });
    }
});

export default productsSlice.reducer;