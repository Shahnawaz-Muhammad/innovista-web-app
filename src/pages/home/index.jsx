import React from "react";

import Hero from "../../components/hero";
import HeroFeatures from "../../components/hero-features";
import Testimonials from "../../components/testimonials";
import FrequentlyAskedQuestions from "../../components/faq";
import LearnMore from "../../components/learn-more";
import Amenities from "../../components/amneties";
import OurBenefits from "../../components/OurBenifits";



const Home = () => {
  return (
    <>

      <Hero />
      <HeroFeatures />
      <LearnMore />
      <Amenities />
      <Testimonials />
      <OurBenefits />
      <FrequentlyAskedQuestions />
</>
  );
};

export default Home;
