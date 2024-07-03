const express = require('express');
const mongoose = require('mongoose');
const {Users,Courses} = require('../db');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../middleware/auth');
const {authenticateJwt} = require('../middleware/auth');

const router = express.Router();



router.post('/signup',async (req, res) => {
    // logic to sign up user  
     let {username,password}= req.body;
     let userExist=await Users.findOne({username});
  
     
     if(userExist){
      res.status(404).json({error:'user already exists'});
     }else{
  
      let user = new Users({username,password});
      
      await user.save();
      res.status(201).json({message:'user created!'});
     }
  
  });
  
  router.post('/login',async (req, res) => {
    // logic to log in user
    let {username,password}=req.headers;
    let user= await Users.findOne({username,password});
    if(user){
      let token=jwt.sign({username:username,role:'user'},secretKey);
      res.status(200).json({message:'LogIn successfully!!',token});
    }else{
      res.status(404).json({error:'Wrong username/password'});
    }
  });
  

  
  module.exports = router