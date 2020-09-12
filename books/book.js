const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose = require('mongoose');
const { stringify } = require("querystring");

mongoose.model("Book",{
  title:{
      type:String,
      require:true
  },
  author:{
      type:String,
      require:true
  },
  numberPages:{
      type:Number,
      require:false
  },
  publisher:{
      type:String,
      require:false
  }  
})