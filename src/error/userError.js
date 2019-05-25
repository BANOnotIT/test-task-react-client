/**
 * Created by BANO.notIT on 25.05.19.
 */
import {BaseError} from "./baseError";

export class UserError extends BaseError {
    constructor(code, details) {
        super(code, details);
        Object.setPrototypeOf(this, UserError.prototype);
    }

}
