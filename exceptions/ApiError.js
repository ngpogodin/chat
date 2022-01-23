module.exports = class ApiError extends Error {
    constructor(status,msg,errors = []) {
        super(msg);
        this.message = msg
        this.status = status;
        this.errors = errors;
    }


    static UnauthorizedError() {
        return new ApiError(401, 'User not authorized');
    }

    static ForbiddenError() {
        return new ApiError(403, 'User hasn`t access');
    }

    static NotFoundError() {
        return new ApiError(404, 'not found');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}