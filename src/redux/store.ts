import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import cartSlice from "./slices/cartSlice";
import filterSlice from "./slices/filterSlice";

export const store = configureStore({
	reducer: {
		filter: filterSlice,
		cart: cartSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
