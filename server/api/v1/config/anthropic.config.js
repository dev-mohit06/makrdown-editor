const Anthropic = require("@anthropic-ai/sdk");
require('dotenv').config();

const client = new Anthropic(apiKey = process.env.ANTHROPIC_API_KEY);

module.exports = {
    client
}