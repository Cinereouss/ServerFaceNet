const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = err => {
  // const nameDuplicated = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const valueDuplicated = err.keyValue.name;
  const fieldsDuplicated = Object.keys(err.keyValue);

  const message = `Duplicated fields '${fieldsDuplicated}' with values '${valueDuplicated}': Please use another value !`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errorStats = err.message;
  const message = `Invalid input data: ${errorStats}`;

  return new AppError(message, 400);
};

const handleJsonWebTokenError = () => {
  return new AppError('Invalid token, please try again !', 401);
};

const handleTokenExpiredError = () => {
  return new AppError('Expired token, please try again !', 401);
};

const sendErrDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  // return res.status(err.statusCode).render('error', {
  //   title: 'Something went wrong!',
  //   msg: err.message
  // });
};

const sendErrProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  });
};

module.exports = (err, req, res, next) => {
  // Middleware with 4 agrs automatically known as 'global Error handling' by Express.
  //console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Difference logs between development and production
  if (process.env.NODE_ENV === 'development') {
    sendErrDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // Errors from Mongo does not recognised as Operational error, so we need to spectify it
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateErrorDB(error);
    }

    // Errors from Mongo, validation errors
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }

    if (error.name === 'JsonWebTokenError') {
      error = handleJsonWebTokenError();
    }

    if (error.name === 'TokenExpiredError') {
      error = handleTokenExpiredError();
    }

    sendErrProd(error, req, res);
  }
};
