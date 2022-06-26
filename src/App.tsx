import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {db} from "./firebase";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";
import {RootState} from "./redux/store";

type Pizza = {
	id: string;
	imageUrl: string;
	name: string;
	types: number[];
	sizes: number[];
	price: number;
	category: number;
	rating: number;
};

const App: React.FC = () => {
	const [pizzas, setPizzas] = useState<Pizza[]>([]);
	const activeCategory = useSelector(
		(state: RootState) => state.filter.categoryId,
	);
	const activeSortItem = useSelector((state: RootState) => state.filter.sortId);
	const searchValue = useSelector((state: RootState) => state.filter.search);

	useEffect(() => {
		let data: Pizza[];
		onValue(ref(db), (snapshot) => {
			if (activeCategory) {
				data = snapshot
					.val()
					.filter((item: Pizza) => item.category === activeCategory);
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
			<Header />
			<div className="content">
				<div className="container">
					<Routes>
						<Route path="/" element={<Home pizzas={pizzas} />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default App;
