//connecting express to database
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Registration",{   
// connecting to mongodb database
    
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`no connection`);
})
