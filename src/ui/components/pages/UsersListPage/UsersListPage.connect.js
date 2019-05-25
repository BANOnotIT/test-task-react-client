import {UsersListPage} from './UsersListPage';
import {connect} from 'react-redux';
import {select} from "../../../model";

export default connect((state) => ({
    users: select.usersItems.list(state),

    isInitial: select.usersItems.isInitial(state),
    isFetched: select.usersItems.isFetched(state),
    isFetching: select.usersItems.isFetching(state),
    isErrored: select.usersItems.isErrored(state),
    getErrorMessage: select.usersItems.getErrorMessage(state),

    router: state.router,
}), (dispatch) => {
    return {
        fetch: dispatch.usersItems.fetch
    }
})(UsersListPage);
