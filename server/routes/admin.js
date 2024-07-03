const express = require('express');
const mongoose = require('mongoose');
const {Admin,Users,Courses} = require('../db');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../middleware/auth');
const {authenticateJwt} = require('../middleware/auth');

const router = express.Router();



router.post('/signup', async (req, res) => {
    // logic to sign up admin
    let {username,password} = req.body;
    let admin = await Admin.findOne({username});
    if(admin){
      res.status(404).json({error:'user already exists'});
    }else{
      let obj={
        username:username,
        password:password
      }
      let newAdmin = new Admin(obj);
      newAdmin.save();
      res.status(201).json({message:'Admin created!!'});
    }
    
  });
  
  router.post('/login', (req, res) => {
    // logic to log in admin
    let {username,password} = req.headers;
    let admin = Admin.findOne({username,password});
    if(admin){
      let token = jwt.sign({username:username,role:'admin'},secretKey);
      res.status(200).json({message:'Login success!!',token:token});
    }else{
      res.status(404).json({error:'admin not founnd!!'});
    }
  });

  module.exports=router