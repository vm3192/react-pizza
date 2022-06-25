import styles from "./Error.module.scss";

const Error = (props) => {
	return (
		<div className={styles.error}>
			<p>Error 404</p>
			<p>Page not found</p>
		</div>
	);
};

export default Error;
