import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
	categoryId: 0,
	sortId: 0,
	search: "",
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		changeCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		changeSortId(state, action: PayloadAction<number>) {
			state.sortId = action.payload;
		},
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
	},
});

export const {changeCategoryId, changeSortId, setSearch} = filterSlice.actions;
export default filterSlice.reducer;
