const mongoose = require("mongoose");  
// importing mongoose to connect to backend

const employeeSchema = new mongoose.Schema({     
 // declaring schema for database in mongodb
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
       unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
})

const Register = new mongoose.model("Register",employeeSchema);
module.exports = Register; // exporting the the data schema..