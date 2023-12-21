import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  EmployeeName: {
    type: String,
    required: true,
  },
  E_ContactNo: {
    type: String,
    required: true,
  },
  EmpId:{
    type:Number,
    required:true
  },
  Designation:{
    type:String,
    required:true
  },
 
  Email: {
    type: String,
    required: true,
    //unique: true,
  },

  EmployeeEmail:{
    type:String,
    required:true
  }
  
});

const Employees = mongoose.model('Employees', EmployeeSchema);

export default Employees;