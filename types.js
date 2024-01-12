const z = require('zod');

const CreateTodo = z.object({
    title : z.string(),
    description : z.string(),
    completed : z.boolean()
});


const UpdateTodo = z.object({
    id : z.string(),
});

const DeleteTodo = z.object({
    title : z.string(),
    description : z.string(),
    completed : z.boolean(),
    id : z.string()
});


module.exports = {
    CreateTodo : CreateTodo ,
    UpdateTodo : UpdateTodo ,
    DeleteTodo : DeleteTodo ,
}