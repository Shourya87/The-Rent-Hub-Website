import ApiError from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(err.toJSON());
    }

    return res.status(err?.statusCode || 500).json(new ApiError(err.statusCode || 500, err.message || "An error occurred", err))
}

export default errorHandler;