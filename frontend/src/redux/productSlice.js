import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const { data } = await API.get("/products");
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
