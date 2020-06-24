import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

const fectchMethodStart = () => {
    return {type: actionTypes.FETCH_METHOD_START}
}
const fetchMethodSuccess = (method) => {
    return {
        type: actionTypes.FETCH_METHOD_SUCCESS,
        method: method
    }
}

export const fetchMethod = () => {
    return dispatch => {
        dispatch(fectchMethodStart());
        axios.get('/methods')
        .then(res => {
            return dispatch(fetchMethodSuccess(res.data));
        })
        .catch(e => console.log(e));
    }
}