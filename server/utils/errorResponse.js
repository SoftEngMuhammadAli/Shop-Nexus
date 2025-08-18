class ErrorResponse extends Error {
  /**
   * Create custom error response
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {object} details - Additional error details
   * @param {string} code - Custom error code
   */
  constructor(message, statusCode = 500, details = null, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.code = code || this.getDefaultErrorCode(statusCode);
    this.isOperational = true;
    this.timestamp = new Date().toISOString();

    // Capture stack trace (excluding constructor call from it)
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Get default error code based on HTTP status
   * @param {number} statusCode
   * @returns {string}
   */
  getDefaultErrorCode(statusCode) {
    const codes = {
      400: "BAD_REQUEST",
      401: "UNAUTHORIZED",
      403: "FORBIDDEN",
      404: "NOT_FOUND",
      409: "CONFLICT",
      422: "VALIDATION_ERROR",
      429: "TOO_MANY_REQUESTS",
      500: "INTERNAL_SERVER_ERROR",
      503: "SERVICE_UNAVAILABLE",
    };
    return codes[statusCode] || "UNKNOWN_ERROR";
  }

  /**
   * Convert error to JSON response format
   * @returns {object}
   */
  toJSON() {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        ...(this.details && { details: this.details }),
        timestamp: this.timestamp,
        ...(process.env.NODE_ENV === "development" && { stack: this.stack }),
      },
    };
  }

  /**
   * Create from another error
   * @param {Error} error
   * @param {number} statusCode
   * @returns {ErrorResponse}
   */
  static fromError(error, statusCode = 500) {
    if (error instanceof ErrorResponse) return error;

    return new ErrorResponse(
      error.message,
      statusCode,
      error.details || null,
      error.code || null
    );
  }

  // Common error types as static methods
  static badRequest(message = "Bad Request", details = null) {
    return new ErrorResponse(message, 400, details, "BAD_REQUEST");
  }

  static unauthorized(message = "Unauthorized", details = null) {
    return new ErrorResponse(message, 401, details, "UNAUTHORIZED");
  }

  static forbidden(message = "Forbidden", details = null) {
    return new ErrorResponse(message, 403, details, "FORBIDDEN");
  }

  static notFound(message = "Resource Not Found", details = null) {
    return new ErrorResponse(message, 404, details, "NOT_FOUND");
  }

  static conflict(message = "Conflict", details = null) {
    return new ErrorResponse(message, 409, details, "CONFLICT");
  }

  static validationError(message = "Validation Failed", details = null) {
    return new ErrorResponse(message, 422, details, "VALIDATION_ERROR");
  }

  static internalError(message = "Internal Server Error", details = null) {
    return new ErrorResponse(message, 500, details, "INTERNAL_SERVER_ERROR");
  }
}

export default ErrorResponse;

/**
 * ErrorResponse Usage Examples
 *
 * 1. Basic Usage
 *    import ErrorResponse from './utils/errorResponse';
 *    // In your controller/middleware:
 *    throw new ErrorResponse('User not found', 404);
 *
 * 2. With Additional Details
 *    throw new ErrorResponse(
 *      'Validation failed',
 *      422,
 *      {
 *        fields: {
 *          email: 'Invalid email format',
 *          password: 'Must be at least 8 characters'
 *        }
 *      },
 *      'VALIDATION_ERROR'
 *    );
 *
 * 3. Using Static Helpers
 *    // Instead of:
 *    throw new ErrorResponse('Not authorized', 401);
 *    // You can use:
 *    throw ErrorResponse.unauthorized('Invalid credentials');
 *
 * 4. Converting Existing Errors
 *    try {
 *      // some operation that might throw
 *    } catch (err) {
 *      throw ErrorResponse.fromError(err, 500);
 *    }
 *
 * 5. Sending Error as JSON Response (Express Example)
 *    app.use((err, req, res, next) => {
 *      const error = ErrorResponse.fromError(err);
 *      res.status(error.statusCode).json(error.toJSON());
 *    });
 *
 * 6. Custom Error Codes
 *    throw new ErrorResponse('Payment required', 402, null, 'PAYMENT_REQUIRED');
 */
