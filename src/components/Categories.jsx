import {useSelector, useDispatch} from 'react-redux'
import {changeCategoryId} from '../redux/slices/filterSlice'

function Categories(props) {
	const dispatch = useDispatch()
	const activeCategory = useSelector(state => state.filter.categoryId)

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
}

export default Categories;
