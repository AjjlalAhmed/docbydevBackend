// Importing thing we need
const cloudinary = require("cloudinary");
const imageDataURI = require("image-data-uri");
const path = require("path");
const fs = require("fs");

// Creating cloudinary credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function
// This function create & delete image and upload to cloudinary
const createImage = async(imgBase64String, oldImgId) => {
    // Setting up image id
    let imageId = null;
    // Creating image name
    const imgName = `image-${Date.now()}`;
    // Creating image path
    const filePath = `public/assets/uploads/profileImages/${imgName}`;
    // Creating image from base64 string
    const img = await imageDataURI.outputFile(imgBase64String, filePath);
    // Recreating image path
    const imagePath = path.join(
        __dirname.replace("helpers", `public/assets/uploads/profileImages`),
        `${imgName}.jpeg`
    );
    // Trying to upload image on cloudinary & deleting old image of user profile
    try {
        //   Checking if old image
        if (oldImgId) {
            // Deleting old image
            await cloudinary.uploader.destroy(oldImgId, (result) => { return });
        }
        // Upload image to cloudinary
        await cloudinary.uploader.upload(imagePath, (result) => {
            if (result.public_id) imageId = result.public_id;
        });
    } catch (e) {
        // Returning image id
        console.log(e);
        return imageId;
    }
    // Deleting image from server
    fs.unlinkSync(imagePath);
    // Returning image id
    return imageId;
};

// Exporting functions
module.exports = {
    createImage,
};