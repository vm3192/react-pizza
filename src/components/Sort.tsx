import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {changeSortId} from "../redux/slices/filterSlice";
import {RootState, useAppDispatch} from "../redux/store";

const Sort: React.FC = () => {
	const [visiblePopup, setVisiblePopup] = useState(false);
	const dispatch = useAppDispatch();
	const activeSortItem = useSelector((state: RootState) => state.filter.sortId);
	const sortRef = useRef<HTMLDivElement>(null);

	const sortArr = ["популярности", "цене", "алфавиту"];

	useEffect(() => {
		const handleClick = (e: MouseEvent): void => {
			const _e = e as MouseEvent & {path: Node[]};
			if (sortRef.current && !_e.path.includes(sortRef.current)) {
				setVisiblePopup(false);
			}
		};
		document.body.addEventListener("click", handleClick);
		return () => document.body.removeEventListener("click", handleClick);
	}, []);

	return (
		<div className="sort" ref={sortRef}>
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setVisiblePopup(!visiblePopup)}>
					{sortArr[activeSortItem]}
				</span>
			</div>
			{visiblePopup && (
				<div className="sort__popup">
					<ul>
						{sortArr.map((sortItem, index) => (
							<li
								className={activeSortItem === index ? "active" : ""}
								key={index}
								onClick={() => {
									dispatch(changeSortId(index));
									setVisiblePopup(false);
								}}>
								{sortItem}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Sort;
