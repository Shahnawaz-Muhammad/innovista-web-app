

export const Card = ({ children, className, onClick }) => {
	return (
		<div className={`${className}  rounded-xl`} onClick={onClick}>
			{children}
		</div>
	);
};
