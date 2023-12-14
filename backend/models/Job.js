import mongoose from 'mongoose';


const JobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
   // unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  job_category: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    required: true,
  },
  job_experience: {
    type: String,
    required: true,
  },
  job_vacancy: {
    type: Number,
    required: true,
  },
  job_deadline: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

const Job = mongoose.model('Job', JobSchema);

export default Job;