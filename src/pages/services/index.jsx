
import React from "react";
import PageTitle from "../../components/page-title";
import WeOffer from "../../components/we-offer";
import Features from "../../components/features";
import NewsLetter from "../../components/services-newsLetter";

const Services = ({title}) => {
  return (
   <>
    <PageTitle title={title}/>
    <Features />
    <WeOffer />
    <NewsLetter />
   </>
  );
};


export default Services
