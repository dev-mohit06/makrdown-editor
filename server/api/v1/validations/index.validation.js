const {z} = require('zod');

const convertMdSchema = z.object({
    content: z.string({required_error: "Content is required"}),
});

module.exports = {
    convertMdSchema
};