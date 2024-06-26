const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const fs=require('fs');
const { throws } = require('assert');
const port=3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// let ADMINS = [];
// let USERS = [];
// let COURSES = [];

const secretKeyAdmin='Admin';
const secretKeyUser='user';

let genrateJwtAdmin=(admin)=>{
  let payload={username:admin.username};
 return jwt.sign(payload,secretKeyAdmin);
}


let authenticateAdmin=(req,res,next)=>{
  let pass=req.headers.authorization;
  if(pass){
    let key=pass.split(' ')[1];
    jwt.verify(key,secretKeyAdmin,(err,admin)=>{
      if(err) throw err;
      req.admin=admin;
      next();
    })
  }else{
    res.sendStatus(403);
  }
}

let generateUser=(user)=>{
  let username={username:user.username};
  return jwt.sign(username,secretKeyUser);
}

let authenticateUser=(req,res,next)=>{
  let token=req.headers.authorization;
  if(token){
    let key=token.split(' ')[1];
    jwt.verify(key,secretKeyUser,(err,username)=>{
      if(err) throw err;
      req.username=username;
      next();
    })
  }else{
    res.status(401).json({message:'not authorized'});
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  fs.readFile('03-course-app-medium/admins.json','utf-8',(err,data)=>{ 
    if(err) throw err;
    let admin=req.body;
    let admins = JSON.parse(data);
    let userExist=admins.find(a=>a.username==admin.username);
    if(userExist){
      res.status(403).json({message:'Admin already exists'});
    }else{
      let token=genrateJwtAdmin(admin);
      admins.push(admin);
      fs.writeFile('03-course-app-medium/admins.json',JSON.stringify(admins),(err)=>{
        if(err) throw err;
        res.status(201).json({message:'Admin created',token});
      })
    }
  })
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  let admin=req.headers;
  fs.readFile('03-course-app-medium/admins.json','utf-8',(err,data)=>{
    if(err) throw err;
    let admins=JSON.parse(data);
    let userExist=admins.find(a=>a.username===admin.username && a.password === admin.password);
    if(userExist){
      let token=genrateJwtAdmin(admin);
      res.status(200).json({message:"Login sucessfully",token:token});
    }else{
      res.status(404).json({message:'Admin doesn`t exist'});
    }
  })
});

app.post('/admin/courses',authenticateAdmin, (req, res) => {
  // logic to create a course
  let course=req.body;
  course.id=Math.floor(Math.random()*10000);
  fs.readFile('03-course-app-medium/courses.json','utf-8',(err,data)=>{
    if(err) throw err;
    let courses=JSON.parse(data);
    courses.push(course);
    fs.writeFile('03-course-app-medium/courses.json',JSON.stringify(courses,course.id),(err)=>{
      if(err) throw err;
      res.status(201).json({message:'Courses created!!',id:course.id});
    })
  })
});




app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
  // logic to edit a course
  let courseId = parseInt(req.params.courseId);


  fs.readFile('03-course-app-medium/courses.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read courses data' });
    }

    let courses = JSON.parse(data);
    let course = courses.find(a => a.id === courseId);

    if (course) {
      let update = req.body;
      Object.assign(course, update);

      fs.writeFile('03-course-app-medium/courses.json', JSON.stringify(courses), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update course data' });
        }
        res.status(200).json({message:'Course updated!!'});
      });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  });
});



app.get('/admin/courses',authenticateAdmin, (req, res) => {
  // logic to get all courses
  fs.readFile('03-course-app-medium/courses.json','utf-8',(err,data)=>{
    if(err) throw err;
    let courses=JSON.parse(data);
    res.json({
      courses:courses
    })
  })
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  let user=req.body;
  fs.readFile('03-course-app-medium/users.json','utf-8',(err,data)=>{
    if(err) throw err;
    let users=JSON.parse(data);
    let userExist=users.find(a=>a.username===user.username);
    if(userExist){
      res.status(401).json({message:'User already exists'});
    }else{
      let token = generateUser(user);
      users.push(user);
      fs.writeFile('03-course-app-medium/users.json',JSON.stringify(users),(err)=>{
        if(err) throw err;
        res.status(201).json({message:'User created!!',token:token});
      })
    }
  })
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  let {username,password} = req.headers;
  fs.readFile('03-course-app-medium/users.json','utf-8',(err,data)=>{
    let users=JSON.parse(data);
    let userExist=users.find(a=>a.username===username && a.password==password);
    if(userExist){
      let token = generateUser(userExist);
      res.status(200).json({message:'LogIn success!!',token:token});
    }else{
      res.status(404).json({message:'user doesn`t exist'});
    }
  })

});

app.get('/users/courses',authenticateUser, (req, res) => {
  // logic to list all courses
  fs.readFile('03-course-app-medium/courses.json','utf-8',(err,data)=>{
    if(err) throw err;
    let courses=JSON.parse(data).filter(a=>a.published);
    res.json({
      courses:courses
    })
  })
});

app.post('/users/courses/:courseId',authenticateUser, (req, res) => {
  // logic to purchase a course
  let courseId=parseInt(req.params.courseId);
  fs.readFile('03-course-app-medium/courses.json','utf-8',(err,data)=>{
    if(err) throw err;
    let courses=JSON.parse(data);
    let courseExist=courses.find(a=>a.id===courseId);
    
    if(courseExist){
      fs.readFile('03-course-app-medium/users.json','utf-8',(err,data)=>{
        if(err) throw err;
        let users=JSON.parse(data);
        let userExist=users.find(a=>a.username===req.username.username);
      
        if(userExist){
          userExist.purchaseCourse.push(courseId);
          fs.writeFile('03-course-app-medium/users.json',JSON.stringify(userExist),(err)=>{
            if(err) throw err;
            res.json({message:'course purchased success!!'});
          })
        }else{
          res.status(404).json({message:'user not found'});
        }
      })
    }else{
      res.status(401).json({message:'course not found'});
    }
  })
});

app.get('/users/purchasedCourses',authenticateUser, (req, res) => {
  // logic to view purchased courses
  fs.readFile('03-course-app-medium/users.json','utf-8',(err,data)=>{
    if(err) throw err;
    let users=JSON.parse(data);
    let user=users.find(a=>a.username===req.username.username);
    fs.readFile('03-course-app-medium/courses.json','utf-8',(err,data)=>{
      if(err) throw err;
      let courses=JSON.parse(data);
      let course=courses.filter(a=>user.purchaseCourse.includes(a.id));
      if(course){
        res.json({
          purchaseCourses:course
        })
      }else{
        res.status(404).json({message:'no purchased course'});
      }
    })
  })

});

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});
