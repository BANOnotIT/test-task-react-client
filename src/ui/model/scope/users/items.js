/**
 * Created by BANO.notIT on 25.05.19.
 */
import Machine from '@qiwi/cyclone';
import {UsersApiService} from "../../../../api/users";
import {AuthError} from "../../../../error/authError";

const OK = 'ok';
const FETCHING = 'fetching';
const INITIAL = 'init';
const FETCH_ERROR = 'fetch_error';
const machine = new Machine({
    initialState: INITIAL,
    initialData: {
        list: [],
        error: {
            userMessage: ''
        }
    },
    transitions: {
        'init>fetching': true,
        'fetching>ok': (state, res) => res,
        'fetching>fetch_error': (state, res) => res,
        'fetch_error>fetching': true,
    }
});


const api = new UsersApiService();


export default {
    state: machine.current(),
    reducers: {
        next(prev, next, ...payload) {
            return machine.next(next, ...payload).current()
        }
    },
    effects: {
        async fetch(_, {auth}) {
            this.next(FETCHING);

            try {
                const users = await api.items(auth.data.auth.jwt);
                console.log(users);
                this.next(OK, {
                    list: users
                })
            } catch (err) {
                if (err instanceof AuthError) {
                    this.next(FETCH_ERROR, {error: {...err, userMessage: 'Пройдите авторизацию, пожалуйста.'}});
                    return
                }
                this.next(FETCH_ERROR, {error: {...err, userMessage: 'Что-то пошло не так'}});
            }

        },
    },
    selectors: (slice, createSelector, hasProps) => ({
        isFetching() {
            return slice(users => {
                return users.state === FETCHING
            });
        },
        isFetched() {
            return slice(users => {
                return users.state === OK;
            })
        },
        isInitial() {
            return slice(users => {
                return users.state === INITIAL;
            })
        },
        isErrored() {
            return slice(users => {
                return users.state === FETCH_ERROR;
            })
        },
        list() {
            return slice(users => {
                return users.data.list
            })
        },
        getErrorMessage() {
            return slice(users => {
                return (users.data && users.data.error && users.data.error.userMessage) || undefined;
            })
        }
    })
}
