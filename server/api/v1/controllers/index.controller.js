const ApiResponse = require("../utils/api-response.util");
const { client } = require('../config/anthropic.config');
const Anthropic = require("@anthropic-ai/sdk");
const AsyncWrapper = require("../utils/async-wrapper.util");

function extractMarkdownText(inputString) {
    const prefix = "Here is the text converted to markdown:";
    const startIndex = inputString.trim().indexOf(prefix) + 1;
    
    if (startIndex !== -1) {
        return inputString.substring(startIndex + prefix.length).trim();
    } else {
        return "";
    }
}

const convertMd = AsyncWrapper(async (req,res,next) => {
    const {content: prompt} = req.body;
    
    const result = await client.completions.create({
        prompt: `${Anthropic.HUMAN_PROMPT} Convert the following text to markdown \n\n${prompt} ${Anthropic.AI_PROMPT}`,
        model: "claude-2.1",
        max_tokens_to_sample: 3000,
    });
    res.status(200).json(new ApiResponse(true, "Markdown generated successfully", extractMarkdownText(result.completion)));
    // res.status(200).json(new ApiResponse(true, "Markdown generated successfully", result.completion));
});

module.exports = {
    convertMd
};