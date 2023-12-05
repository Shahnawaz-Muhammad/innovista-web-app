export const ServiceSummary = ({
	userServiceConfiguration,
}) => {
	const { userInfo, selectedPlan } = userServiceConfiguration;

	// for some reason needed to do this work arround bc typescript was crying and bug is not fixed apparently

	return (
		<section className="flex flex-col gap-4 w-full">
			<h2>Confirmation</h2>
			{/* <p>Double-check everyghing looks OK before confirming.</p> */}
			<ul className="flex flex-col gap-2 px-4 py-5 bg-neutral-magnolia rounded-lg">
				<li className="border-b border-neutral-light-gray pb-2">
					<div className="flex flex-col">
						<h3>
							{selectedPlan?.name} 
						</h3>
						{/* <span className="inline-flex justify-between">
							<Button
								type="ghost"
								size="sm"
								className="hover:text-primary-purplish-blue hover:underline"
							>
								Change
							</Button>
						</span> */}
					</div>
				</li>
					<li
						className="inline-flex justify-between"
					>
						<p>You are registering as <span className=' font-semibold'>{userInfo.email}</span>, please confirm to the form.</p>
						<span className="text-primary-marine-blue">
							
						</span>
					</li>
			</ul>
			
		</section>
	);
};
