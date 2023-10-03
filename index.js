const express = require('express');
const { connect } = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');



//morgan: hiển thị thông tin res và time run
const morgan = require('morgan');
app.use(morgan('dev'));
const cookieParser = require('cookie-parser');
app.use(cookieParser())

const connectDB = require('./config/connectDB');
connectDB();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Register route
const authRouter = require('./routes/authRoute');
const { notFound, errorHandler } = require('./middlewares/errorNotfound');
app.use('/api/user',authRouter)

//Product route
const productRoute = require('./routes/productRoute');
app.use('/api/product',productRoute)

//not found
app.use(notFound);
app.use(errorHandler);








app.listen(PORT, ()=>{
    console.log(`Server is running now at ${PORT}`)
})