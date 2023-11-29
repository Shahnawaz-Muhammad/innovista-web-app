import React, { useEffect } from "react";
import PageTitle from "../../components/page-title";
import { Link } from "react-router-dom";

const TermsConditions = ({ title }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div>
        <PageTitle title={title} />
        <div
          className={`w-full z-20 flex justify-center py-20 text-bgLight mx-auto px-4 md:px-8 xl:px-4`}
        >
          <div className="max-w-screen-xl w-full">
            <h1 className="text-2xl font-semibold mb-4 text-orange">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 mb-4">
              Last Updated: Thursday, 2 November 2023
            </p>
            <p className="text-gray-600 mb-4">
              Please carefully review the following Terms & Conditions ("Terms")
              governing your use of D-Labs's co-working space services. By
              accessing or using our website and services, you agree to be bound
              by these Terms. If you do not agree with these Terms, please
              refrain from using our website or services.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-4">
              By using our website and services, you acknowledge that you have
              read and agree to comply with these Terms. You also agree to abide
              by any additional terms and policies provided by D-Labs.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              2. Use of Services
            </h2>
            <p className="text-gray-600 mb-4">
              D-Labs provides co-working space services for freelancers,
              investors, startups, businesses, and agencies. Your use of our
              services is subject to these Terms and any additional terms and
              policies established by us.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              3. Privacy
            </h2>
            <p className="text-gray-600 mb-4">
              Your use of our website and services is also governed by our
              Privacy Policy. By using our services, you consent to the
              collection and use of your personal information as outlined in our
              Privacy Policy.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              4. Membership and Access
            </h2>
            <p className="text-gray-600 mb-4">
              4.1. D-Labs offers membership plans and access to co-working
              spaces. These plans may have associated fees, terms, and
              conditions. By purchasing a membership, you agree to the specific
              terms of the selected plan.
            </p>
            <p className="text-gray-600 mb-4">
              4.2. Access to our co-working spaces is granted subject to
              availability and compliance with our usage policies. We reserve
              the right to restrict or terminate access to co-working spaces for
              violation of our policies.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              5. Payment and Billing
            </h2>
            <p className="text-gray-600 mb-4">
              5.1. Payments for membership plans and services are processed in
              accordance with our payment terms. It is your responsibility to
              provide accurate payment information and keep it up to date.
            </p>
            <p className="text-gray-600 mb-4">
              5.2. We may change our pricing and payment terms at our
              discretion. Any changes will be communicated to you in advance.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              6. Code of Conduct
            </h2>
            <p className="text-gray-600 mb-4">
              6.1. We expect all members and users to maintain a respectful,
              professional, and inclusive environment. Harassment,
              discrimination, or disruptive behavior is not tolerated.
            </p>
            <p className="text-gray-600 mb-4">
              6.2. Members and users must comply with all house rules and
              guidelines provided by D-Labs while using co-working spaces.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              7. Termination
            </h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to terminate or suspend your membership or
              access to our services for violations of these Terms or any
              disruptive behavior.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-4">
              D-Labs is not liable for any direct or indirect damages or losses
              resulting from the use of our services.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              9. Governing Law
            </h2>
            <p className="text-gray-600 mb-4">
              These Terms are governed by the laws of [Your Jurisdiction], and
              any disputes will be resolved in the appropriate courts of that
              jurisdiction.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              10. Changes to Terms
            </h2>
            <p className="text-gray-600 mb-4">
              We may update or modify these Terms at any time, with notice to
              you. It is your responsibility to regularly review our Terms and
              ensure compliance.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-orange">
              11. Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about these Terms &
              Conditions, please{" "}
              <Link to="/contact" className="underline text-orange italic">
                contact us
              </Link>
              .
            </p>
            <p className="text-gray-600 mb-4">
              These Terms & Conditions constitute the agreement between D-Labs
              and its users. Please carefully read and understand your rights
              and responsibilities as you use our co-working space services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
