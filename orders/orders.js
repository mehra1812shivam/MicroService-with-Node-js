const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose = require('mongoose');
const axios = require('axios');
app.use(bodyParser.json());
require('./order')
const Order=mongoose.model("Order");
mongoose.connect("mongodb://localhost:27017/orderssservice", {useNewUrlParser: true,useUnifiedTopology:true},()=>{
    console.log("database connected");
});


app.post('/orders',(req,res)=>{
    var letsgo={
        customerID:mongoose.Types.ObjectId(req.body.customerID),
        booksID:mongoose.Types.ObjectId(req.body.booksID),
        initialDate:req.body.initialDate,
        delieveryDate:req.body.delieveryDate
    }
    var newLet=new Order(letsgo)
    newLet.save().then(()=>{
        console.log("Order Created with success");
        res.send("done");
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
});


app.get('/orders',(req,res)=>{
    Order.find().then((orders)=>{
        res.json(orders);
    }).catch((err)=>{
        if (err){
            throw err
        }
    });
});

app.get('/orders/:id',(req,res)=>{
    Order.findById(req.params.id).then((orders)=>{
        if(orders){
            axios.get("http://localhost:5000/customers/"+ orders.customerID).then((response)=>{
                var orderObject={customerName:response.data.name,bookTitle:''}
                axios.get("http://localhost:4000/books"+ orders.booksID).then((response)=>{
                    orderObject.bookTitle=response.data.title;
                    res.json(orderObject)
                }).catch((err)=>{
                    if(err){
                        throw err
                    }
                });
            });
            res.send("Quick Response");

        }else{
            res.send("Invalid Order");
        }
    }).catch((err)=>{
        if(err){
            throw error
        }
    });
})




















app.listen(3000,function(){
    console.log("server started");
});
