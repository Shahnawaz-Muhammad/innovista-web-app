import mongoose from 'mongoose';

const ExpSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  designation: {
    type: String, // Assuming Designation is a string, change it to the appropriate type if needed
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});

const Experience = mongoose.model('Experience', ExpSchema);

export default Experience;