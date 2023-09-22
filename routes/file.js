const express = require('express');
const router = express.Router();

const { localFileUpload, imageUpload } = require('../controllers/fileUpload');

router.post('/localFileUpload', localFileUpload);
router.post('/imgUpload', imageUpload);

// console.log(router);

module.exports = router;