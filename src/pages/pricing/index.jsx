import React from 'react'

import PageTitle from '../../components/page-title'
import FrequentlyAskedQuestions from '../../components/faq'
import Packages from '../../components/packages'

const Pricing = ({title}) => {
  return (
    <>
    <PageTitle title={title}/>
    <Packages />
    <FrequentlyAskedQuestions />
    </>

  )
}

export default Pricing