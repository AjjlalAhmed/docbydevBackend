// Importing thing we need
const { google } = require("googleapis");
const imageDataURI = require("image-data-uri");
const path = require("path");
const fs = require("fs");
// Creating credentials
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);
// Setting up credentials
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
// Setting up google drive
const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});

// Functions
const uploadImageToDrive = async(path, name) => {
    try {
        // Creaing new image in google drive
        const response = await drive.files.create({
            requestBody: {
                name: name,
                parents: ["1fz8olF9L4TBX9JICwasNGaCqyAAJLmXV"],
                mimeType: "image/jpg",
            },
            media: {
                mimeType: "image/jpg",
                body: fs.createReadStream(path),
            },
        });
        // Permissions object
        const drivePermissions = {
            fileId: response.data.id,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        };
        // Setting permissions to public
        await drive.permissions.create(drivePermissions);
        // Getting image id 
        await drive.files.get({
            fileId: response.data.id,
        });
        // Deleting image from server
        fs.unlinkSync(path);
        // Returning image id
        return response.data.id;
    } catch (err) {
        return err;
    }
};
const createImage = async(imgBase64String, oldImgId) => {
    // Creating image name
    const imgName = `image-${Date.now()}`;
    // Creating image path
    let filePath = `public/assets/uploads/profileImages/${imgName}`;
    // Creating image from base64 string
    let img = await imageDataURI.outputFile(imgBase64String, filePath);
    // Replacing public to empty string
    img = img.replace("public", "");
    // Uploading image to google drive
    imgUrl = await uploadImageToDrive(
        path.join(
            `D:\\keep-coding\\VueProjects\\docbydev\\server\\public\\assets\\uploads\\profileImages`,
            `${imgName}.jpeg`
        ),
        imgName
    );
    // Checkinh user have old image
    if (oldImgId) {
        const fileId = oldImgId;
        // Try deleting olg image
        try {
            await drive.files.delete({ fileId }).execute();
            return imgUrl;
        } catch (e) {
            console.log(e.message);
            return imgUrl;
        }
    } else {
        return imgUrl;
    }
};

// Exporting functions
module.exports = {
    uploadImageToDrive,
    createImage,
};