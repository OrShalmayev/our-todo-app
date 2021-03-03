import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import * as path from 'path'

dotenv.config();


const PORT = process.env.PORT || 5000
const db = process.env.MONGODB_URI




const app = express()

//middleware
app.use(express.json())
app.use(cors())

//routes
import todosRoutes from './routes/api/todos'
const Users = require('./routes/api/Users')

app.use('/api/todos', todosRoutes)
app.use('/api/users', Users)



//serve static routes in production
if(process.env.NODE_ENV === 'production'){
    //set a static folder
    app.use(express.static('client/dist/client'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'client', 'index.html'))
    })
}



mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true  })
    .then(()=> console.log('mongodb connected'))
    .catch(err => console.log(err))

app.listen(PORT, ()=> console.log(`server started on ${PORT}`))