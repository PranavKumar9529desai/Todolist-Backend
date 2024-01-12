const Mongoose = require("mongoose");
require('dotenv').config();

Mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{console.log("database connected")})
.catch((err)=>{console.log(err)});

// creating Schema 
const newTodoSchema = new Mongoose.Schema({
    title : String,
    description : String ,
    completed : Boolean
})

const todo = new Mongoose.model('Todo',newTodoSchema);



module.exports = {
    todo
}
