class ApiError extends Error {
    constructor(statusCode = 500, message = "Something went wrong", errors = "", stack = "") {
        super(message);
        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }

    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            errors: this.errors,
            stack: process.env.NODE_ENV === "development"  ? this.stack : undefined,
        }
    }

}

export default ApiError;