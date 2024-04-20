const ApiResponse = require("./api-response.util");

const AsyncWrapper = (fn) => {
    return async (req,res,next) => {
        try{
            await fn(req,res,next);
        }
        catch(err){
            res.status(500).json(new ApiResponse(false, err.message));
        }
    }
}

module.exports = AsyncWrapper;