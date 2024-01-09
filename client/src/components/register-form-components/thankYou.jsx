import { Link } from "react-router-dom";
import thankyouimg from '../../assets/images/thankyou.png'

export const ThankYou = () => {
	return (
		<section className="flex flex-col justify-center items-center w-full gap-2 py-[36px]">
			<figure className="w-32 h-32">
				<img
					src={thankyouimg}
					alt="Form compleated, thank you!"
				/>
			</figure>
			<h2>Thank you</h2>
			<span className="text-center">
				<p>Thanks for joining INNOVISTA Family</p>
				<p>
					We wish you best of luck at our platform. 
					In case of any queries, we are just a text away.
				</p>
			</span>

			<div className="flex gap-4">
			<Link to="/" className="bg-gray-700 hover:bg-gray-900 text-white px-6 py-2">Home </Link>
			<Link to="/login" className="bg-orange hover:bg-orangeDark text-white px-6 py-2">Login </Link>
			</div>
		</section>
	);
};
