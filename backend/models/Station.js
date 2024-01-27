import mongoose from 'mongoose';


const ReservationTypeSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
    },
    Quantity:{
      type:String,
      
    },
    Price:{
      type:String,
    }
  });
  

const StationsSchema = new mongoose.Schema({
  Chapter: {
    type: String,
    required: true,
    unique: true, 
  },
  reservationTypes: [ReservationTypeSchema],
});

const Station = mongoose.model('Stations', StationsSchema);

export default Station;