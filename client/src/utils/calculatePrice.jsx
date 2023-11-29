export const calculatePrice = (price, monthly) => {
	if (monthly) return price;
	else return price * 10;
};