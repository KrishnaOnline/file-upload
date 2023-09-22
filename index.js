const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server Started at Port: ${PORT}`);
})

app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

require('./configs/database').dbConnect();
require('./configs/cloudinary').cloudinaryConnect();