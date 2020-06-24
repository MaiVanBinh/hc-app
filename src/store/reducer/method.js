import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    method: null,
    loading: false,
    error: false
}
const fetchMethodStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchMethodSuccess = (state, action) => {
    return updateObject(state, {
        method: action.method,
        loading: false
    })
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_METHOD_START: return fetchMethodStart(state, action);
        case actionTypes.FETCH_METHOD_SUCCESS: return fetchMethodSuccess(state, action);
        default: return state;
    }
}

export default reducer;
