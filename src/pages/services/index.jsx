
import React from "react";
import PageTitle from "../../components/page-title";
import WeOffer from "../../components/we-offer";
import Features from "../../components/features";

const Services = ({title}) => {
  return (
   <>
    <PageTitle title={title}/>
    {/* <Features /> */}
    <WeOffer />
   </>
  );
};


export default Services
