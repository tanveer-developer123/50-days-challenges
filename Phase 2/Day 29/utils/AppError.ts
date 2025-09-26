// utils/AppError.js
export default class AppError extends Error {
  statusCode: any;
    success: boolean;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    // stack trace preserve karega (optional but useful)
    Error.captureStackTrace(this, this.constructor);
  }
}
