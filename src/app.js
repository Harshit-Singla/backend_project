const express = require("express"); 
//importing express
const path = require("path");

const app = express(); 
// app containes all functions and usibility of express
const hbs = require("hbs"); 
// telling our program to include hbs templates
require("./db/conn"); 
// enabling the app.js to connect to mongodb...
const Register = require("./models/registers");
const port = process.env.PORT || 3000; 
//provide port for global hosting or local

const static_path = path.join(__dirname,"../public"); 
//declaring path to public folder
const template_path = path.join(__dirname,"../templates/views"); 
// declaring path to views folder
const partial_path = path.join(__dirname,"../templates/partials");
 // declaring path to partials folder

app.use(express.json());  
// exporting data in json format
app.use(express.urlencoded({extended:false})); 

app.use(express.static(static_path));
 // using built in static method to use files in public folder


app.set("view engine","hbs");
 // enabling our website to use the handlebars template
app.set("views",template_path);
 // setting the template_path as views.
hbs.registerPartials(partial_path);
 //telling our program to include partials folder 

app.get("/",(req,res)=>{
       // routing the http request and rendering index.hbs on successful callback.
    res.render("index")
});



app.post("/register",async(req,res)=>{
 // routing http request and sending the input data in form and saving it as object in a variable.
    try{
            const password = req.body.password;
            const cpassword = req.body.cnfpass;
            if(password===cpassword){  
                // validating if passwords match or not...
                const registerEmployee = new Register({
                     // if matched then store the data as an object..
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: req.body.password,
                    confirmpassword: req.body.cnfpass
                })

               const register = await registerEmployee.save();
               res.status(201).render("index"); 
                //after successful request save the data and render the index page again..

            }else{
                res.send("passwords do not match");
                 // if passwords do not match then send a error message..
            }
        

    }catch(error){
        res.status(400).send(error); 
        // if callback failed then send error 400..
    }
})

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})
