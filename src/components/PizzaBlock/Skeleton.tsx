import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
	<ContentLoader
		speed={2}
		width={280}
		height={465.5}
		viewBox="0 0 280 465.5"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		>
		<circle cx="132" cy="147" r="116" />
		<rect x="12" y="330" rx="5" ry="5" width="244" height="82" />
		<rect x="13" y="437" rx="5" ry="5" width="102" height="18" />
		<rect x="128" y="427" rx="5" ry="5" width="125" height="35" />
		<rect x="11" y="280" rx="5" ry="5" width="246" height="35" />
	</ContentLoader>
);

export default Skeleton;
