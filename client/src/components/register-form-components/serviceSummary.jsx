export const ServiceSummary = ({ userServiceConfiguration }) => {
  const { userInfo, selectedPlan } = userServiceConfiguration;

  // for some reason needed to do this work arround bc typescript was crying and bug is not fixed apparently
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2>Confirmation</h2>
      {/* <p>Double-check everyghing looks OK before confirming.</p> */}
      <ul className="flex flex-col gap-2 px-4 py-5 bg-neutral-magnolia rounded-lg">
        <li className="border-b border-neutral-light-gray pb-2">
          <div className="flex flex-col">
            <h3>{selectedPlan?.name} </h3>
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
        <li className="inline-flex flex-col justify-between">
          <p>
            You are registering as{" "}
            <span className="font-semibold">{userInfo.firstName} {userInfo.lastName}</span>, and your credentials are:
          </p>
          <ul className="list-disc ml-6">
            <li>
              <strong>Email:</strong> {userInfo.email}
            </li>
			<li>
              <strong>CNIC:</strong> {userInfo.cnic}
            </li>
			<li>
              <strong>Mobile:</strong> {userInfo.mobile}
            </li>
            <li>
              <strong>Account Type: </strong> {selectedPlan.name}
            </li>
            {/* Include other user details as needed */}
          </ul>
          <p>
            Please review your credentials and submit the form.
          </p>
        </li>
      </ul>
    </section>
  );
};
