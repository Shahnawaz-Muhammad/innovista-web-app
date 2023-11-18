import { Card } from './card';
import clsx from 'clsx';
import freelancer from '../../assets/images/conference-room.jpeg'
import group from '../../assets/images/conference-room.jpeg'
import company from '../../assets/images/conference-room.jpeg'

const activeClasses =
	'border border-primary-purplish-blue bg-neutral-magnolia falopa';

const plans = [
	{
		name: 'Freelancer',
		icon: freelancer,
	},
	{
		name: 'Group',
		icon: group,
	},
	{
		name: 'Company',
		icon: company,
	},
];


export const SelectPlan = ({
	selectedPlan,
	updateSelectedPlan,
	showRequired

}) => {
	return (
		<section className="flex flex-col gap-4 w-full ">
			<h2>Select your Category</h2>
			
			<ul className="mt-16 flex flex-col gap-2 lg:flex-row">
				{plans.map((plan) => (
					<li key={plan.name} className="lg:w-full">
						<Card
							className={clsx(
								' flex gap-4 transition-all w-full lg:flex-col lg:gap-8 hover:border-primary-purplish-blue hover:bg-neutral-magnolia cursor-pointer',
								plan.name === selectedPlan?.name
									? activeClasses
									: 'border border-neutral-light-gray'
							)}
							onClick={() => updateSelectedPlan(plan)}
						>
							<figure className="">
								<img
									src={`${plan.icon}`}
									alt=""
									className="rounded-xl h-36 w-full"
								/>
							</figure>
							<div className="	">
								<h3 className="leading-5 text-center pb-4 text-xl font-extrabold">{plan.name}</h3>
								

								
							</div>
						</Card>
					</li>
				))}
			</ul>
				{showRequired && <div>
					Please Select a Category</div>}
			
		</section>
	);
};
