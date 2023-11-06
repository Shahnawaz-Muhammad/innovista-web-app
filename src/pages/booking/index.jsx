import React, { useEffect } from 'react'
import PageTitle from '../../components/page-title'
import HeroFeatures from '../../components/hero-features'
import BookingForm from '../../components/booking-form'

const Booking = ({title}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <PageTitle title={title}/>
    <HeroFeatures />
    <BookingForm />
   </>
  )
}

export default Booking