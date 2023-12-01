import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  ContactNo: {
    type: Number,
    required: true,
  },
  Member: {
    type: String, // Assuming Designation is a string, change it to the appropriate type if needed
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
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;