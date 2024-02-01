import mongoose from 'mongoose';

const signupSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  cnicNo: {
    type: String,
    required: true,
  }, 
  mobileNo: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate:{
    type:Date,
  },

  category: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: function () {
      return !['Group', 'Company'].includes(this.category);
    },
  },
  gender: {
    type: String,
    required: function () {
      return !['Group', 'Company'].includes(this.category);
    },
  },
  qualification: {
    type: String,
    required: function () {
      return !['Group', 'Company'].includes(this.category);
    },
  },
  designation: {
    type: String,
    required: function () {
      return !['Group', 'Company'].includes(this.category);
    },
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  bookingStation: {
    type: String,
    required: true,
  },
  people: {
    type:String,
    required: function () {
      return ['Group', 'Company'].includes(this.category);
    },
   },
   NTN: {
    type:String,
    required: function () {
      return this.category === 'Company';
    },
   }
});

const User = mongoose.model('User', signupSchema);

export default User;