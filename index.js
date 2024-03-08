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

//Auth route
const authRouter = require('./routes/authRoute');
const { notFound, errorHandler } = require('./middlewares/errorNotfound');
app.use('/api/user',authRouter)

//Product route
const productRoute = require('./routes/productRoute');
app.use('/api/product',productRoute)

//Blog route
const blogRoute = require('./routes/blogRoute');
app.use('/api/blog',blogRoute)

//Category route
const categoryRoute = require('./routes/categoryRoute');
app.use('/api/category',categoryRoute)

//Blog category route
const blogCateRoute = require('./routes/blogCatRoute');
app.use('/api/blogcate',blogCateRoute)

//Branch route
const branchRoute = require('./routes/branchRoute');
app.use('/api/branch', branchRoute)

//Coupon route
const couponRoute = require('./routes/couponRoute');
app.use('/api/coupon', couponRoute)

//not found
app.use(notFound);
app.use(errorHandler);










app.listen(PORT, ()=>{
    console.log(`Server is running now at ${PORT}`)
})