import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/Index";
import ReactPaginate from "react-paginate";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import { useEffect, useState } from "react";

const Home = (props) => {
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 6;

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(props.pizzas.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(props.pizzas.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, props.pizzas]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % props.pizzas.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{props.pizzas.length !== 0
					? //sorting in 3 ways
					  currentItems.map((pizza) => (
							<PizzaBlock key={pizza.id} {...pizza} />
					  ))
					: [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
			</div>
			<ReactPaginate
				breakLabel="..."
				nextLabel="next"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				pageCount={pageCount}
				previousLabel="prev"
				renderOnZeroPageCount={null}
				containerClassName="pagination"
				pageLinkClassName="pagination__link"
				previousLinkClassName="pagination__link pagination__link--pag_prev"
				nextLinkClassName="pagination__link pagination__link--pag_next"
				activeLinkClassName="pagination__link pagination__link--pag_active"
			/>
		</>
	);
};

export default Home;
