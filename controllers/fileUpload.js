const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log(file);
        const filename = file.name.split('.');
        let path = __dirname + '/files/' + Date.now() + `.${filename[filename.length-1]}`;
        console.log(path);
        file.mv(path, (err) => {
            console.error("Error: ", err);
        });
        
        return res.json({
            success: true,
            message: "Local File Uploaded Successfully"
        })        
        
    } catch(err) {
        console.error("Error: ", err);
        return res.json({
            message: "Cannot Upload File To Local"
        })
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

function cloudinaryUpload(file, folder) {
    return cloudinary.uploader.upload(file, {folder, resource_type: 'auto', quality: 10 });
}

exports.imageUpload = async (req, res) => {
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imgFile;
        console.log(file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.json({
                success: false,
                message: "File Format Not Supported"
            })
        }

        const result = await cloudinaryUpload(file.tempFilePath, 'FileUploadSampleApp');
        console.log("Result: ", result);

        const fileData = await File.create({
            name, tags, email, imageUrl: result.secure_url,
        })

        return res.json({
            data: result,
            success: true,
            message: "Image Uploaded to Cloudinary"
        })
    } catch(err) {
        console.log(err);
        return res.json({
            success: false,
            message: "Error Uploading Image to Cloudinary"
        })
    }
}