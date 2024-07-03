const express = require('express');
const {Users,Courses} = require('../db');
const {authenticateJwt} = require('../middleware/auth')

const router = express.Router();

router.get('/users/me',authenticateJwt,async (req,res)=>{
    const user = await Users.findOne({username:req.admin.username});
    if(!user){
        res.status(403).json({msg:'user doesn`t exist'})
        return
    }
    res.json({username:user.username});
  })

router.get('/', async(req, res) => {
    // logic to list all courses
    let course=await Courses.find({published:true});
    res.json({
      courses:course
    });
  });
  
  router.post('/:courseId', authenticateJwt, async (req, res) => {
    //logic to purchase courses
      let courseId = parseInt(req.params.courseId);
      let course = await Courses.findOne({ id: courseId });
  
      if (course) {
        let user = await Users.findOne({ username: req.admin.username });
        if (user) {
          if (!user.purchaseCourse) {
            user.purchaseCourse = []; // Initialize purchaseCourse if it doesn't exist
          }
          user.purchaseCourse.push(courseId);
          await user.save();
          res.status(200).json({message:'Course purchased!!'});
        } else {
          res.status(400).json({error:'User not found'});
        }
      } else {
        res.status(404).json({error:'Course not found'});
      }
    
  });

  router.get('/purchasedCourses',authenticateJwt,async (req, res) => {
    // logic to view purchased courses
    let user= await Users.findOne({username:req.admin.username});
    if(user){
      let course=[];
      for(let j=0;j<user.purchaseCourse.length;j++){
        let obj= await Courses.find({id:user.purchaseCourse[j]});
        course.push(obj);
      }
      res.json({course});
    }else{
      res.status(404).json({error:'user not found!!'});
    }
  });
  
  module.exports=router
