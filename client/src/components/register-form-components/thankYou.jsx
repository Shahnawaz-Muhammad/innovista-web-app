import { Link } from "react-router-dom";
import thankyouimg from '../../assets/images/icon-thank-you.svg'

export const ThankYou = () => {
	return (
		<section className="flex flex-col justify-center items-center w-full gap-4 py-[36px]">
			<figure className="w-[60px] h-[60px]">
				<img
					src={thankyouimg}
					alt="Form compleated, thank you!"
				/>
			</figure>
			<h2>Thank you</h2>
			<span className="text-center">
				<p>Thanks for confirming your subscription!</p>
				<p>
					We hope you have using our platform. If you ever need
					support, please feel free to email us at
					support@dlabs.com
				</p>
			</span>

			<div className="flex gap-4">
			<Link to="/" className="bg-gray-800 text-white px-6 py-2">Home </Link>
			<Link to="/login" className="bg-orange text-white px-6 py-2">Login </Link>
			</div>
		</section>
	);
};
