import React from 'react'

import PageTitle from '../../components/page-title'
import ContactDetail from '../../components/contact-details'

const Contact = ({title}) => {
  return (
    <>
    <PageTitle title={title}/>
    <ContactDetail />
    </>
  )
}

export default Contact