const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose = require('mongoose');
const { stringify } = require("querystring");


mongoose.model("Order",{
    customerID:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    booksID:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    initialDate:{
        type:Date,
        required:true
    },
    delieveryDate:{
        type:Date,
        required:true
    }
});