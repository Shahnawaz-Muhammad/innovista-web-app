import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  FullName: {
    type: String, 
    required: true,
  },
  ReservationType: {
    type: String, 
    required: true,
  },
  BookingStation: {
    type: String,
    required: true,
  },
  BookingDate: {
    type: Date,
    required: true,
  },
  ExpiryDate: {
    type: Date,
    required: true,
  },

  BookingTime: {
    type: String,
    required: true,
  },
  ExpiryTime: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    //unique: true,
  },
  registrationDate:{
    type:Date,
    
  },
  category: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;