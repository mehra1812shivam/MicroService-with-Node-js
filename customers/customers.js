const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose = require('mongoose');

app.use(bodyParser.json());
require("./customer")
const Customer=mongoose.model("Customer");
mongoose.connect("mongodb://localhost:27017/customerservice", {useNewUrlParser: true,useUnifiedTopology:true},()=>{
    console.log("database connected");
});



app.post('/customers',(req,res)=>{
    var newVar={
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }
    var newCheck=new Customer(newVar);
    newCheck.save().then(()=>{
        console.log("New Customer Created!")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
    res.send("Take this as a response");
});


app.get('/customers',(req,res)=>{
    Customer.find().then((customers)=>{
        res.json(customers);
    }).catch((err)=>{
        if (err){
            throw err
        }
    });
});


app.get('/customers/:id',(req,res)=>{
    Customer.findById(req.params.id).then((customers)=>{
        res.json(customers);
    }).catch((err)=>{
        if(err){
            throw error
        }
    });
})

app.delete('/customers/:id',(req,res)=>{
    Customer.findByIdAndRemove(req.params.id).then(()=>{
        res.send("Customer Deleted");
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
});












app.listen(5000,function(){
    console.log("server started");
});

