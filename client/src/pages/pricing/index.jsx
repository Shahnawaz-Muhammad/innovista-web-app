import React, { useEffect } from "react";

import PageTitle from "../../components/page-title";
import FrequentlyAskedQuestions from "../../components/faq";
import Packages from "../../components/packages";

const Pricing = ({ title }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <PageTitle title={title} />
      <Packages />
      <FrequentlyAskedQuestions />
    </>
  );
};

export default Pricing;
