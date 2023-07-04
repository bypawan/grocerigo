import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface CartState {
  isSidebarOpen: boolean;
}

const initialState: CartState = {
  isSidebarOpen: false,
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    openSideBar(state) {
      state.isSidebarOpen = true;
    },

    closeSideBar(state) {
      state.isSidebarOpen = false;
    },
  },
});

export const { openSideBar, closeSideBar } = CartSlice.actions;
export default CartSlice.reducer;
