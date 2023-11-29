import mongoose from 'mongoose';


const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    // unique: true,
  },
});

const Education = mongoose.model('Education', educationSchema);

export default Education;