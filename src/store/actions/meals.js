import * as actionType from './actionTypes';
import axios from '../../axiosInstance';

export const fetchMealsSuccess = (data) => {
    return {
        type: actionType.FETCH_MEALS_SUCCESS,
        data: data
    }
}

export const fetchMealsFailed = (error) => {
    return {
        type: actionType.FETCH_MEALS_FAIL,
        error: error
    }
}

export const fetchMealsStart = () => {
    return {
        type: actionType.FETCH_MEALS_START
    }
}

export const fetchMeals = (page, search, method, role) => {
    let url = '/meals?page=' + page + '&role=' + role;
    if(search) {
        url += '&search='+encodeURIComponent(search);
    }
    if(method) {
        url += '&method='+encodeURIComponent(method);
    }
    return dispatch => {
        dispatch(fetchMealsStart());
        axios.get(url)
            .then(res => {
                dispatch(fetchMealsSuccess(res.data));
            })
            .catch(e => {
                dispatch(fetchMealsFailed(e));
            })
        }
}

export const fetchOneMealSuccess = (meal) => {
    return {
        type: actionType.FETCH_ONE_MEAL_SUCCESS,
        meal:  meal
    }
}

export const fetchOneMeal = (mealId, userId) => {
    return dispatch => {
        dispatch(fetchMealsStart());
        axios.get('/meals/' + mealId + '?user=' + userId)
            .then(res => {
                dispatch(fetchOneMealSuccess(res.data));
            })
            .catch(e => {
                dispatch(fetchMealsFailed(e));
            })
        }
}

const fetchCommentsSuccess = (comments) => {
    return {
        type: actionType.FETCH_COMMENTS_SUCCESS,
        comments: comments
    }
}

export const fetchComments = (meaId, page) => {
    return dispatch => {
        axios.get('/meals/' + meaId + '/comment?page=' + page)
            .then(res => {
                dispatch(fetchCommentsSuccess(res.data));
            })
            .catch(e => {
                dispatch(fetchMealsFailed(e));
            })
        }
}

export const deleteCommentSuccess = (commentId) => {
    return {
        type: actionType.DELETE_COMMENT_SUCCESS,
        commentId: commentId
    }
}

export const deleteComment = (token, commentId) => {
    return dispatch => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
          }
        axios.delete('meals/comment/' + commentId, config)
            .then(res => {
                dispatch(deleteCommentSuccess(commentId));
            })
            .catch(e => {
                dispatch(fetchMealsFailed(e));
            })
        }
}

export const addCommentSuccess = (comment) => {
    return {
        type: actionType.ADD_COMMENT_SUCCESS,
        comment: comment
    }
}

export const addComment = (token, mealId, content) => {
    return dispatch => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
          }
        axios.post('/meals/' + mealId + '/comment', {content: content}, config)
            .then(res => {
                dispatch(addCommentSuccess(res.data));
            })
            .catch(e => {
                dispatch(fetchMealsFailed(e));
            })
        }
}

const likeSuccess = (mode) => {
    return {
        type: actionType.LIKE_SUCCESS,
        mode: mode
    }
}

export const likeMeal = (token, mealId, mode) => {
    return dispatch => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
          }
        axios.post('/meals/like', {mealId: mealId, mode: mode }, config)
        .then(() => {
            dispatch(likeSuccess(mode))
        })
        .catch(e => {});
    }
}