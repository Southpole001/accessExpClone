const { StatusCodes } = require('http-status-codes');
const httpStatus = require('http-status-codes');

exports.pageNotFoundError = (req, res) => {
    let errorCode = StatusCodes.NOT_FOUND;
    
    res.status(errorCode);
    res.render("error");
    
}

exports.internalServerError = (req, res) => {
    let errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`Error occured: ${error.stack}`)
    res.status(errorCode);
    res.send(`${error} | Sorry, i am napping right now!`)
}