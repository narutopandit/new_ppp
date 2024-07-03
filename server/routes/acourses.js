const express = require('express');
const {Admin,Courses} = require('../db');
const {authenticateJwt} = require('../middleware/auth')

const router = express.Router();

router.get('/admin/me',authenticateJwt,async (req,res)=>{
    const admin = await Admin.findOne({username:req.admin.username});
    if(!admin){
        res.status(403).json({msg:'admin doesn`t exist'})
        return
    }
    res.json({username:admin.username});
})

router.post('/',authenticateJwt, async (req, res) => {
    // logic to create a course
    let obj=req.body;
    let newCourse = new Courses(obj);
    newCourse.id=Math.floor(Math.random()*10000);
    await newCourse.save();
    res.status(200).json({message:'Course created!!',cousrseId:newCourse.id});
  });
  
  router.put('/:courseId', authenticateJwt, async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const course = await Courses.findOneAndUpdate({ id: courseId }, req.body);
      if (course) {
        res.json({ message: 'Course updated successfully', course });
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating course', error: error.message });
    }
  });
  
  router.get('/',authenticateJwt, async (req, res) => {
    // logic to get all courses
    let course= await Courses.find({});
    res.json({
      courses:course
  });
  });

  module.exports=router