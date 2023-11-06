import React from "react";
import PageTitle from "../../components/page-title";
import { Link } from "react-router-dom";

const Privacy = ({ title }) => {
  return (
    <>
      <PageTitle title={title} />
      <div
        className={`w-full z-20 flex justify-center py-20 text-bgLight mx-auto px-4 md:px-8 xl:px-4`}
      >
        <div className="max-w-screen-xl w-full">
          <h1 className="text-2xl font-semibold mb-4 text-yellow">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-4">
            Last Updated: Thursday, 2 November 2023
          </p>
          <p className="text-gray-600 mb-4">
            DLabs ("we," "us," or "our") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and
            disclose your personal information when you visit our website or use
            our services. By accessing or using our website or services, you
            consent to the practices described in this Privacy Policy.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2 text-yellow">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 mb-4">
            1.1 We may collect the following types of personal information:
          </p>
          <ul className="list-disc ml-8 text-gray-600 ">
            <li>
              Contact Information: When you sign up for our services, we may
              collect your name, email address, phone number, and postal
              address.
            </li>
            <li>
              Payment Information: To process payments for services, we may
              collect your credit card information or other payment details.
            </li>
            <li>
              Business Information: If you are a business or organization, we
              may collect information about your company, such as its name,
              size, and industry.
            </li>
          </ul>

          <p className="text-gray-600 mb-4">
            1.2 Information We Collect Automatically:
          </p>
          <ul className="list-disc ml-8 text-gray-600 ">
            <li>
              Usage Information: We may collect information about how you use
              our website and services, including your IP address, browser type,
              and operating system.
            </li>
            <li>
              Log Data: We collect log data, including the pages you visit, the
              date and time of your visit, and the duration of your visit.
            </li>
            <li>
              Cookies and Similar Technologies: We may use cookies and similar
              technologies to collect information about your browsing behavior.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-4 mb-2 text-yellow">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-4">
            We may use your personal information for the following purposes:
          </p>
          <p className="text-gray-600 mb-4">
            2.1. Providing and Managing Services:
          </p>

          <ul className="list-disc ml-8 text-gray-600 ">
            <li>To set up and manage your co-working space account.</li>
            <li>To process payments for services.</li>
            <li>
              To communicate with you regarding our services, including updates
              and changes.
            </li>
          </ul>
          <p className="text-gray-600 mb-4">
            2.2. Improving and Customizing Services:
          </p>

          <ul className="list-disc ml-8 text-gray-600 ">
            <li>
              To understand how you use our website and services and make
              improvements.
            </li>
            <li>
              To customize our services and content to better meet your needs.
            </li>
          </ul>

          <p className="text-gray-600 mb-4">2.3. Marketing and Promotions:</p>

          <ul className="list-disc ml-8 text-gray-600 ">
            <li>To send you marketing and promotional materials.</li>
            <li>To personalize marketing content based on your preferences.</li>
          </ul>

          <p className="text-gray-600 mb-4">
            2.4. Compliance and Legal Obligations:
          </p>

          <ul className="list-disc ml-8 text-gray-600 ">
            <li>To comply with legal obligations and regulations.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4 mb-2 text-yellow">
            Sharing Your Information
          </h2>
          <p className="text-gray-600 mb-4">
            We may share your personal information in the following
            circumstances:
          </p>
          <p className="text-gray-600 mb-4">
            3.1. Service Providers: We may share your information with
            third-party service providers who help us operate our business, such
            as payment processors and marketing service providers.
          </p>
          <p className="text-gray-600 mb-4">
            3.2. Business Partners: We may share information with business
            partners or affiliates for marketing or promotional purposes.
          </p>
          <p className="text-gray-600 mb-4">
            3.3. Legal Compliance: We may share your information if required to
            do so by law or in response to a valid legal request.
          </p>
          <p className="text-gray-600 mb-4">
            3.4. Business Transfers: If we are involved in a merger,
            acquisition, or sale of all or a portion of our assets, your
            information may be transferred to the acquiring entity.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2 text-yellow">
            Security
          </h2>
          <p className="text-gray-600 mb-4">
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, and destruction.
            However, no method of transmission over the internet or electronic
            storage is entirely secure, and we cannot guarantee absolute
            security.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2 text-yellow">
            Your Choices
          </h2>
          <p className="text-gray-600 mb-4">
            You have choices regarding how we use your personal information:
          </p>

          <p className="text-gray-600 mb-4">
            5.1. Access and Correction: You can access and update your personal
            information through your account settings.
          </p>
          <p className="text-gray-600 mb-4">
            5.2. Marketing Communications: You can opt out of receiving
            marketing communications from us by following the instructions in
            our communications.
          </p>
          <p className="text-gray-600 mb-4">
            5.3. Cookies: You can manage cookies and similar technologies
            through your browser settings.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2 text-yellow">
            Changes to this Privacy Policy
          </h2>
          <p className="text-gray-600 mb-4">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            posting the updated Privacy Policy on our website or through other
            means.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2 text-yellow">
            Contact Us
          </h2>

          <p className="text-gray-600 mb-4">
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please{" "}
            <Link to="/contact" className="underline text-yellow italic">
              contact us
            </Link>
            .
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2 text-yellow">
            Changes to this Privacy Policy
          </h2>

          <p className="text-gray-600 mb-4">
            By using our website and services, you agree to the terms of this
            Privacy Policy.
          </p>
        </div>
      </div>{" "}
    </>
  );
};

export default Privacy;
