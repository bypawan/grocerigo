import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CartReducer from "./cartSlice";

const rootReducer = combineReducers({ cart: CartReducer });

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
