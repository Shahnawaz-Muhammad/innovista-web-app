import React from 'react'

import PageTitle from '../../components/page-title'
import FrequentlyAskedQuestions from '../../components/faq'

const Pricing = ({title}) => {
  return (
    <>
    <PageTitle title={title}/>
    <FrequentlyAskedQuestions />
    </>

  )
}

export default Pricing