const mongoose = require('mongoose');

let adminSchema=mongoose.Schema({
    username:String,
    password:String,
  })
  let userSchema=mongoose.Schema({
    username:String,
    password:String,
    purchaseCourse: { type: [Number], default: [] ,ref:'Courses'}
  })
  let courseSchema=mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    published:Boolean,
    id: { type: Number, unique: true }
  })
  
  let Admin=mongoose.model('Admin',adminSchema);
  let Users=mongoose.model('Users',userSchema);
  let Courses=mongoose.model('Courses',courseSchema);

  module.exports= {
    Admin,
    Users,
    Courses
  }