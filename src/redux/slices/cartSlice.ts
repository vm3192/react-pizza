import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
	totalPrice: number;
	totalCount: number;
	items: {
		id: string;
		imageUrl: string;
		name: string;
		price: number;
		type: string;
		size: number;
		count: number;
	}[];
}

interface IPizza {
	id: string;
	imageUrl: string;
	name: string;
	price: number;
	type: string;
	size: number;
	count: number;
}

const initialState: IState = {
	totalPrice: 0,
	totalCount: 0,
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<IPizza>) {
			if (!state.items.find((item) => item.id === action.payload.id)) {
				state.items.push(action.payload);
			}
			state.totalPrice = state.items.reduce((total, el) => {
				return total + el.price * el.count;
			}, 0);
			state.totalCount = state.items.reduce((total, el) => {
				return total + el.count;
			}, 0);
		},
		clearCart(state) {
			state.totalPrice = 0;
			state.totalCount = 0;
			state.items = [];
		},
		countPlus(state, action: PayloadAction<string>) {
			state.items = state.items.map((item) =>
				item.id === action.payload ? {...item, count: item.count + 1} : item,
			);
			state.totalPrice = state.items.reduce((total, el) => {
				return total + el.price * el.count;
			}, 0);
			state.totalCount = state.items.reduce((total, el) => {
				return total + el.count;
			}, 0);
		},
		countMinus(state, action: PayloadAction<string>) {
			state.items = state.items.map((item) =>
				item.id === action.payload && item.count > 1
					? {...item, count: item.count - 1}
					: item,
			);
			state.totalPrice = state.items.reduce((total, el) => {
				return total + el.price * el.count;
			}, 0);
			state.totalCount = state.items.reduce((total, el) => {
				return total + el.count;
			}, 0);
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((item) => item.id !== action.payload);
			state.totalPrice = state.items.reduce((total, el) => {
				return total + el.price * el.count;
			}, 0);
			state.totalCount = state.items.reduce((total, el) => {
				return total + el.count;
			}, 0);
		},
	},
});

export const {addItem, clearCart, countPlus, countMinus, removeItem} =
	cartSlice.actions;
export default cartSlice.reducer;
