import mongoose from 'mongoose';

const CvSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  }, 
  cvFile: {
    type: String,
    required: true,
  },
  CompanyEmail:{
    type:String,
    required:true
  },
  JobTitle:{
    type:String,
    required:true
  }
});

const UserCv = mongoose.model('UserCv', CvSchema);

export default UserCv;