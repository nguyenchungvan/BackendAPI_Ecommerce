const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'1d'});  //tạo 1 token, thời gian tồn tại 1 day
}

module.exports = {generateToken};