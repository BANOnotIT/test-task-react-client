/**
 * Created by BANO.notIT on 25.05.19.
 */
import {LoginHttpClient} from "../loginHttpClient";
import {UserError} from "../../error/userError";
import {AuthError} from "../../error/authError";


export class UsersApiService {
    constructor() {
        this.client = new LoginHttpClient();
    }

    async item(jwt, id) {
        try {
            const apiResponse = await this.client.get('users/item', {id}, {
                headers: {'Authorization': `Bearer ${jwt}`}
            });
            return apiResponse;
        } catch (err) {
            let errorBody;
            if (err && err.response && err.response.json) {
                errorBody = await err.response.json();
            }
            switch (errorBody && errorBody.error) {
                case AuthError.TOKEN_IS_INVALID:
                    throw new AuthError(AuthError.TOKEN_IS_INVALID, errorBody)
                default:
                    throw new UserError(UserError.API_ERROR, errorBody);
            }
        }

    }

    async items(jwt) {
        try {
            const apiResponse = await this.client.get('users/items', {}, {
                headers: {'Authorization': `Bearer ${jwt}`}
            });
            return apiResponse;
        } catch (err) {
            let errorBody;
            if (err && err.response && err.response.json) {
                errorBody = await err.response.json();
                switch (errorBody && errorBody.error) {
                    case AuthError.TOKEN_IS_INVALID:
                        throw new AuthError(AuthError.TOKEN_IS_INVALID, errorBody)
                    default:
                        throw new UserError(UserError.API_ERROR, errorBody);
                }
            }
        }
    }
}
