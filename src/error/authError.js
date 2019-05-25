import {BaseError} from "./baseError";

export class AuthError extends BaseError {
    static BAD_CREDENTIALS = 'BAD_CREDENTIALS';
    static TOKEN_IS_INVALID = 'ERROR_AUTH_TOKEN_IS_INVALID';

    constructor(code, details) {
        super(code, details);
        Object.setPrototypeOf(this, AuthError.prototype);
    }

}
