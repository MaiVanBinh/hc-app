import * as actionType from './actionTypes';
import axios from '../../axiosInstance';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

export const authSuccess = (token, userId, role) => {
    return {
        type: actionType.AUTH_SUCCESS,
        token: token,
        userId: userId,
        role: role
    };
}

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    return {
        type: actionType.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {

        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
} 

const createAccountSuccess = () => {
    return {
        type: actionType.CREATE_ACCOUNT_SUCCESS
    }
}

export const authLoginSocialNetwork = (payload) => {
    return dispatch => {
        localStorage.setItem('token',  payload.token);
        localStorage.setItem('userId',  payload.userId);
        localStorage.setItem('role', payload.role);
        const expirationDate = new Date(new Date().getTime() + payload.expirationTime * 1000);
        localStorage.setItem('expirationDate',  expirationDate);
        dispatch(authSuccess(payload.token, payload.userId, payload.role));
        dispatch(checkAuthTimeout(payload.expirationTime));
    }
}
export const auth = (name, email, password, passwordConfirmation, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            name: name,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        }
        let url = '/auth/signup';
        if(!isSignup) {
            url = '/auth/login';
        }
        axios.post(url, authData)
            .then(res => {
                if(!isSignup){
                    localStorage.setItem('token',  res.data.token);
                    localStorage.setItem('userId',  res.data.userId);
                    localStorage.setItem('role', res.data.role);
                    const expirationDate = new Date(new Date().getTime() + res.data.expirationTime * 1000);
                    localStorage.setItem('expirationDate',  expirationDate);
                    dispatch(authSuccess(res.data.token, res.data.userId, res.data.role));
                    dispatch(checkAuthTimeout(res.data.expirationTime));
                } else {
                    dispatch(createAccountSuccess());
                }

            })
            .catch(err => {
                let errMessage =  [];
                if(err.response.data.data){
                    errMessage = err.response.data.data.map(e => e.msg);
                } else {
                    errMessage.push(err.response.data.message);
                }
                dispatch(authFail(errMessage));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path: path 
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout()); 
            } else {
                dispatch(authSuccess(token, userId, role));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
