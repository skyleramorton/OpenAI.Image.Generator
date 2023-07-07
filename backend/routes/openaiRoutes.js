const router = require('express').Router();
const { generateImage } = require('../controllers/openaiGenerate');

router.post('/generateimage', generateImage);

module.exports = router;
