const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
var ObjectId = mongoose.Schema.ObjectId; //Định nghĩa type ObjectId do trong Schema k có


var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role:{                                      //phân quyền user, admin
        type: String,
        default: 'user'
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: ObjectId, 
        ref: 'Address'
    },
    wishlist: {
        type: ObjectId,
        ref: 'Product'
    },
    refreshToken: {
        type: String
    }
},
{
    timestamps: true,   //save time document create
});

userSchema.pre('save', async function(next){ //pre: đăng ký 1 middleware function trước khi document được lưu vào database
    const salt = await bcrypt.genSaltSync(10); //chuỗi salt ngẫu nhiên để mã hóa mật khẩu, 10 lần lặp lại salt
    this.password = await bcrypt.hash(this.password,salt) //hash password bằng salt
})
userSchema.methods.isPasswordMatched= async function(enteredPassword){  //định nghĩa 1 phương thức isPasswordMatched để so sánh enterPassword và password đã lưu, nếu đúng trả về true
    return await bcrypt.compare(enteredPassword,this.password)
}
//Export the model
module.exports = mongoose.model('User', userSchema);

