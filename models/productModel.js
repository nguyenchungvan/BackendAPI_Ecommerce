const mongoose = require('mongoose'); // Erase if already required
const ObjectId = mongoose.Schema.ObjectId;

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true                          //bỏ khoảng trắng
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true                     //chuyển thành chứ thường
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    category: {
        type: String,
        require: true
    },
    branch: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    sold: {
        type: Number,
        def: 0,
                               //không hiển thị khi truy vấn
    },
    image: {
        type: Array,
    },
    color: {
        type: String,
        require: true
    },
    rating: {
        star: Number,
        postedby: {type: ObjectId, ref: 'User'}
    }
}, {timestamps: true});

//Export the model
module.exports = mongoose.model('Product', productSchema);