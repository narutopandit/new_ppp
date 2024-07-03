const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const aCourseRouter= require('./routes/acourses')
const userRouter = require('./routes/users');
const uCourseRouter = require('./routes/ucourses')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin',adminRouter);
app.use('/users',userRouter);
app.use('/admin/courses',aCourseRouter);
app.use('/users/courses',uCourseRouter);

mongoose.connect('mongodb+srv://narutopandit220:IURGKbYlxoKOHQmt@cluster0.du5zhdq.mongodb.net/courses',{ dbName: "courses" });

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});
