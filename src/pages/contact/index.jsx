import React, { useEffect } from 'react'

import PageTitle from '../../components/page-title'
import ContactDetail from '../../components/contact-details'
import ContactForm from '../../components/contact-form'

const Contact = ({title}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <PageTitle title={title}/>
    <ContactDetail />
    <ContactForm />
    </>
  )
}

export default Contact