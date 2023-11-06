import React, { useEffect } from 'react'

import PageTitle from '../../components/page-title'
import Amenities from '../../components/amneties'
import OurBenefits from '../../components/OurBenifits'

const About = ({title}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <PageTitle title={title}/>
    <Amenities />
    <OurBenefits />
      
    </>
  )}
export default About