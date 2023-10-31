import React from 'react'

import PageTitle from '../../components/page-title'
import Amenities from '../../components/amneties'
import OurBenefits from '../../components/OurBenifits'

const About = ({title}) => {
  return (
    <>
    <PageTitle title={title}/>
    <Amenities />
    <OurBenefits />
      
    </>
  )}
export default About