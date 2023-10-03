const mongoose = require('mongoose');
const validateIDMongo = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid){
        throw new Error('This is not valid or Not found ID')
    }
};

module.exports = validateIDMongo;