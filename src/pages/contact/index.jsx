import React from 'react'

import PageTitle from '../../components/page-title'
import ContactDetail from '../../components/contact-details'
import ContactForm from '../../components/contact-form'

const Contact = ({title}) => {
  return (
    <>
    <PageTitle title={title}/>
    <ContactDetail />
    <ContactForm />
    </>
  )
}

export default Contact