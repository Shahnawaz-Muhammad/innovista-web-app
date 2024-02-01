import mongoose from "mongoose";

const RegionalAdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  station: {
    type: String,
    require: true,
  },
  role: { type: String }, // or 'superadmin'
  status: {
    type: Boolean,
  },
});

const RegionalAdmin = mongoose.model("RegionalAdminUsers", RegionalAdminSchema);

export default RegionalAdmin;
