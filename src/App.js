import {createContext, useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {db} from "./firebase";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

export const AppContext = createContext("");

function App() {
	const [pizzas, setPizzas] = useState([]);
	const activeCategory = useSelector((state) => state.filter.categoryId);
	const activeSortItem = useSelector((state) => state.filter.sortId);
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		let data;
		onValue(ref(db), (snapshot) => {
			if (activeCategory) {
				data = snapshot
					.val()
					.filter((item) => item.category === activeCategory);
			} else {
				data = snapshot.val();
			}
			if (activeSortItem) {
				data =
					activeSortItem === 1
						? data.sort((a, b) => a.price - b.price)
						: activeSortItem === 2
						? data.sort((a, b) =>
								a.name > b.name ? 1 : a.name < b.name ? -1 : 0,
						  )
						: data.sort((a, b) => a.rating - b.rating);
			}
			if (searchValue) {
				data = data.filter((item) =>
					item.name.toLowerCase().includes(searchValue.toLowerCase()),
				);
			}
			setPizzas(data);
		});
	}, [activeCategory, activeSortItem, searchValue]);

	return (
		<div className="wrapper">
			<AppContext.Provider value={{searchValue, setSearchValue}}>
				<Header />
				<div className="content">
					<div className="container">
						<Routes>
							<Route
								path="/"
								element={<Home pizzas={pizzas} searchValue={searchValue} />}
							/>
							<Route path="/cart" element={<Cart />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</AppContext.Provider>
		</div>
	);
}

export default App;
