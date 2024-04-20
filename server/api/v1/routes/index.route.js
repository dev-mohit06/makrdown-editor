const validateRequest = require('../middleware/validate-request.middleware');
const { convertMdSchema } = require('../validations/index.validation');
const { convertMd } = require('../controllers/index.controller');

const router = require('express').Router();

router.post('/generate-md',validateRequest(convertMdSchema),convertMd);

module.exports = router;