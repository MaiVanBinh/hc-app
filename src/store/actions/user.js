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

const fetchUserSuccess = (user) => {
    return {
        type: actionType.FETCH_USER_SUCCESS,
        user: user
    }
}

export const fetchUser = (token) => {
    return dispatch => {
        dispatch(authStart());
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
          }
        axios.get('/users/me', config)
        .then(res => {
            dispatch(fetchUserSuccess(res.data));
        })
        .catch(e => {
            dispatch(authFail(e.response));
        })
    }
}

export const addMealIntoViewList = (mealId) => {
    return {
        type: actionType.ADD_MEAL_INTO_VIEW_LIST,
        mealId: mealId
    }
}

const addMealIntoViewListSuccess = () => {
    alert('Thêm thành công món ăn vào danh sách xem sau');
    return {
        type: actionType.ADD_MEAL_INTO_VIEW_LIST_SUCCESS,
    }
}

export const addMealIntoViewListStart = (token, mealId) => {
    return dispatch => {
        dispatch(authStart);
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
          }
        axios.post('/users/add-views-list', {mealId: mealId}, config)
        .then(() => {
             dispatch(addMealIntoViewListSuccess());
        })
        .catch(e => dispatch(authFail(e.response)));
    }
}

const deleteMealIntoViewListSuccess = (mealId, isViewsLike) => {
    return{
        type: actionType.DELETE_MEAL_INTO_VIEW_LIST_SUCCESS,
        mealId: mealId,
        isViewsLike: isViewsLike
    }
}

export const deleteMealIntoViewList = (token, mealId, isViewsLike) => {
    let url = '/users/delete-views-list';
    if(!isViewsLike) {
        url = '/users/delete-owner-list';
    }
    return dispatch => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
          }
        axios.patch(url, {mealId: mealId}, config)
        .then(res => {
            dispatch(deleteMealIntoViewListSuccess(mealId, isViewsLike));
        })
        .catch(e => {
            dispatch(authFail(e.response));
        })
    }
}

export const addNewMealSuccess = (meal) => {
    return {
        type: actionType.ADD_NEW_MEAL_SUCCESS,
        meal: meal
    }
}

export const updateMealSuccess = (meal) => {
    return{
        type: actionType.UPDATE_MEAL_SUCCESS,
        meal: meal
    }
} 

export const changeAvatarHandler = (imageUrl) => {
    return {
        type: actionType.CHANGE_IMAGE,
        imageUrl: imageUrl
    }
}

export const deleteError = () => {
    return {
        type: actionType.DELETE_ERROR
    }
}

export const deleteUserWhenLogout = () => {
    return {
        type: actionType.AUTH_LOGOUT
    };
}