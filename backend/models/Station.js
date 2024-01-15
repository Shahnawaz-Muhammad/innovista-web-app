import mongoose from 'mongoose';

const StationsSchema = new mongoose.Schema({
  Chapter: {
    type: String,
    required: true,
    unique: true, 
  },
 
});

const Station = mongoose.model('Stations', StationsSchema);

export default Station;