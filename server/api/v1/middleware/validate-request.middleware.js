const zod = require('zod');
const AsyncWrapper = require('../utils/async-wrapper.util');
const ApiResponse = require('../utils/api-response.util');

const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            res.status(400).json(new ApiResponse(false, error.errors[0].message));
        }
    }
}

module.exports = validateRequest;