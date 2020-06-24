import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    caSuccess: false,
    token: null,
    error: null,
    loading: false,
    user: null,
    authRedirectPath: '/',
    userId: null,
    role: 'user'
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true, caSuccess: false});
}

const authSuccess = (state, action) => {
    return updateObject(state, { 
        token: action.token,
        userId: action.userId, 
        error: null, 
        loading: false,
        role: action.role
    });
}

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null, 
        userId: null,
        user: null,
        role: 'user'
    });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path});
}

const deleteError = (state, action) => {
    return updateObject(state, {
        error: null,
        caSuccess: false
    });
} 

const createAccountSuccess = (state, aciton) => {
    return updateObject(state, {
        caSuccess: true
    });
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FAIL: return authFail(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state, action);
        case actionType.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionType.DELETE_ERROR: return deleteError(state, action);
        case actionType.CREATE_ACCOUNT_SUCCESS: return createAccountSuccess(state, action);
        default:
            return state;
    }
}

export default reducer;