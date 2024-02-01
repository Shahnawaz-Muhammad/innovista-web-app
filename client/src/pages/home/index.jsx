import React from "react";

import Hero from "../../components/hero";
import HeroFeatures from "../../components/hero-features";
import Testimonials from "../../components/testimonials";
import FrequentlyAskedQuestions from "../../components/faq";
import LearnMore from "../../components/learn-more";
import Amenities from "../../components/amneties";
import OurBenefits from "../../components/OurBenifits";
import WeOffer from "../../components/we-offer";
import MapComponent from '../../components/MapComponent/index'
import ImageSlider from "../../components/MapComponent/ImageSlider";
const Home = () => {
  return ( 
    <>
      <Hero />
      <HeroFeatures />
      <LearnMore />
      <WeOffer />
      <ImageSlider />
      <Amenities />
      {/* <Testimonials /> */}
      
      <OurBenefits />
      <FrequentlyAskedQuestions />
      <MapComponent />
    </>
  );
};

export default Home;
