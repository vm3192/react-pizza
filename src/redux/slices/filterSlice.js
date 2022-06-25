import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	categoryId: 0,
	sortId: 0,
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		changeCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		changeSortId(state, action) {
			state.sortId = action.payload;
		},
	},
});

export const {changeCategoryId, changeSortId} = filterSlice.actions;
export default filterSlice.reducer;
