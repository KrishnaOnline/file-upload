const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server Started at Port: ${PORT}`);
});

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));

const Upload = require('./routes/file');
app.use('/api/v1/upload', Upload);

app.use(express.json());

require('./configs/database').dbConnect();
require('./configs/cloudinary').cloudinaryConnect();