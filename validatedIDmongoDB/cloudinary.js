const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

//Tạo 1 hàm để upload image
const uploadingCloudinary = async (file) => {
    return new  Promise ((resolve)=> {
        cloudinary.uploader.upload(file, (result) => {
            resolve(
                {
                    url: result.secure_url,
                },
                {
                    resource_type: 'auto',
                }
            )
        })
    })
}

module.exports = uploadingCloudinary;