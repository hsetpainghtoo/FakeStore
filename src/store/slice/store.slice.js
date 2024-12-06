import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: false,
  loading: false,
  value: 1,
};

const storeSlice = createSlice({
  name: "storeSlice",
  initialState,
  reducers: {
    processing: (state) => {
      state.loading = true;
    },
    mistake: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    products: (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.data = action.payload);
    },
  },
});

export const { processing, mistake, products } = storeSlice.actions;
export default storeSlice.reducer;
