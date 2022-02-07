const express = require('express');
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');


const app = express();
dotenv.config()
connectDB();

app.use(express.json()); 

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());




app.use('/api/users', userRoutes)
app.use('/api/admin',adminRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log('server started on port 5000'))