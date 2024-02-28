const createError = require('http-errors');

function notFoundHandler(req, res, next) {
    next(createError(404, 'Route not found!'));
}

function errorHandler(err, req, res, next) {
    let error = process.env.NODE_ENV === 'development' ? err : { message: err.message };
    res.status(err.status || 500);
    res.json(error)
}

module.exports = {
    notFoundHandler,
    errorHandler
}