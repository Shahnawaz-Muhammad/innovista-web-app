import React from "react";

import Hero from "../../components/hero";
import HeroFeatures from "../../components/hero-features";
import Testimonials from "../../components/testimonials";
import FrequentlyAskedQuestions from "../../components/faq";
import LearnMore from "../../components/learn-more";
import Amenities from "../../components/amneties";
import OurBenefits from "../../components/OurBenifits";
import WeOffer from "../../components/we-offer";

const Home = () => {
  return (
    <>
      <Hero />
      <HeroFeatures />
      <LearnMore />
      <WeOffer />
      <Amenities />
      <Testimonials />
      <OurBenefits />
      <FrequentlyAskedQuestions />
    </>
  );
};

export default Home;
