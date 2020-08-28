class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // in Error class has constructor(message)

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // 2 tpe of error: Operational and Programming

    Error.captureStackTrace(this, this.constructor); // ??
  }
}

module.exports = AppError;
