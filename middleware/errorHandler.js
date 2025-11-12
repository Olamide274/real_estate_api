const { constants } = require("../constant");

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ Title: "Validation Error", message: err.message, stack: err.stack})
            break;
        case constants.NOT_FOUND:
            res.json({ Title: "Not Found", message: err.message, stack: err.stack})
            break;
          case constants.UNAUTHORIZED:
            res.json({ Title: "Unauthorized", message: err.message, stack: err.stack})
            break;
            case constants.FORBIDDEN:
            res.json({ Title: "Forbidden", message: err.message, stack: err.stack})
            break;
        case constants.SERVER_ERROR:
            res.json({ Title: "Server Error", message: err.message, stack: err.stack})
            break;
        default:
            console.log("No Error, All Good")
            break;
    }
    
}


module.exports = errorHandler