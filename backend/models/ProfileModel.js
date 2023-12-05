import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String, // Change type to String for base64 representation
    required: true,
  },
});

const UserPro = mongoose.model('UserProfile', ProfileSchema);

export default UserPro;
