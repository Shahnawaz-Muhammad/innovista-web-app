import React from 'react'
import PageTitle from '../../components/page-title'
import HeroFeatures from '../../components/hero-features'
import BookingForm from '../../components/booking-form'

const Booking = ({title}) => {
  return (
    <>
    <PageTitle title={title}/>
    <HeroFeatures />
    <BookingForm />
   </>
  )
}

export default Booking