export default class AppError extends Error {
    isOperational: boolean;
    message: string;

    constructor(message = "", isOperational = true) {
        super();
        Error.call(this);
        Error.captureStackTrace(this);
        this.message = message;
        this.isOperational = isOperational;
    }
}
