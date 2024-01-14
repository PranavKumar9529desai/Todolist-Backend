const express = require('express');
const jwt = require('jsonwebtoken');
const {todo} = require('./db');
const app = express();
const { UpdateTodo , CreateTodo } = require('./types');
const { Mongoose } = require('mongoose');
const cors = require('cors');
const { error } = require('console');
app.use(express.json());
app.use(cors());
const env = require('dotenv').config();
const PORT = process.env.PORT;


app.get("/todos" ,async function(req,res){
    try {
        const alltodos = await todo.find({});
        res.status(200).send({msg : alltodos});
    } catch (error) {
         console.log(error);
    }
    
});

app.post("/todo",async function(req,res){
    const taskData = req.body;
    const Task = CreateTodo.safeParse(taskData);
     if(!Task.success) 
      {
        return res.status(400).json( {
            msg : "authentication failed , You have send tasks in wrong format",expected_format : 'title : the title , description : the description'});
      }

    else
      {
        res.status(200).json({msg : "Task created sucessfully"});
      };
    

    const title = req.body.title;
    const description = req.body.description;
    await todo.create({
        title : title,
        description : description ,
        completed : false ,
    }).
    then(()=>{
        console.log("tasks saved sucessfully");
    }).
    catch(()=>{console.log(err);})

});


app.put("/completed",async function(req,res){
    const taskData = req.body;
    const updatedTask = UpdateTodo.safeParse(taskData);
    if(!updatedTask.success) {
        res.status(400).send( {msg : "authentication failed"});
    }
    try {
        const updatedStatusOfTask = await todo.findOneAndUpdate(
            { _id: req.body.id },
            { completed: true },
            { new: true }  // This option makes the function return the updated document
        );
        res.status(200).send({
            msg: 'Status of the Task is successfully updated',
            details: updatedStatusOfTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'An unexpected error occurred' });
    }
   
});


app.delete("/delete",async function(req,res){
   const task_id = req.body.id;
   console.log(req.body);
   try {
    const DeleteStatus = await todo.deleteOne({_id : task_id } , {completed : true });
   res.status(200).send({
     msg : 'Sucessfully deleted the task' ,
     deatails : DeleteStatus})
   } catch (error) {
       console.log(error);
   }
   ;
})

app.listen(PORT || 3000 ,function(req,res){
   console.log(`Server is running on port ${PORT}`);
});