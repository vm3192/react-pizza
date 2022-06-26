import {useSelector} from "react-redux";
import {changeCategoryId} from "../redux/slices/filterSlice";
import {RootState, useAppDispatch} from "../redux/store";

const Categories: React.FC = () => {
	const dispatch = useAppDispatch();
	const activeCategory = useSelector(
		(state: RootState) => state.filter.categoryId,
	);

	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) => (
					<li key={index}>
						<span
							className={activeCategory === index ? "active" : ""}
							onClick={() => dispatch(changeCategoryId(index))}>
							{category}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
