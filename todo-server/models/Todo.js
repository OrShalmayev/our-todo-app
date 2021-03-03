import { Schema, model } from 'mongoose';

//creat todo schema 

const TodoSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})



const Todo = model('todo', TodoSchema);

export default Todo;