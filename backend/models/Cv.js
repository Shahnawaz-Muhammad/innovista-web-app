import mongoose from 'mongoose';

const CvSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  CvContent: {
    type: Buffer,
    required: true,
  },
  CvFilePath: {
    type: String,
    required: true,
  },
});

const UserCv = mongoose.model('UserCv', CvSchema);

export default UserCv;