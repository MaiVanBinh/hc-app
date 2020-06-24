import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    meals: [],
    loading: false,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    currentMeal: null,
    search: null,
    currentComments: [],
    haveMoreComment: null,
    total: 0
}

const fetchMealsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const fetchMealsSuccess = (state, action) => {
    return updateObject(state, {
        meals: action.data.meals,
        loading: false,
        currentPage: action.data.currentPage,
        hasNextPage: action.data.hasNextPage,
        hasPrevPage: action.data.hasPrevPage,
        total: action.data.totalMeals
    });
}

const fetchMealsFailed = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const fetchOneMealSuccess = (state, action) => {
    const mealUpdate = {
        ...action.meal.meal,
        isLike: action.meal.isLike
    }
    return updateObject(state, {
        currentMeal: mealUpdate,
        loading: false,
        currentComments: []
    })
}

const fetchCommentSuccess = (state, action) => {
    const haveMoreComment = action.comments.pop();
    let updateComments = [];
    if(state.currentComments) {
        updateComments = state.currentComments.concat(action.comments);
    } else {
        updateComments = [...action.comments]
    }
    return updateObject(state, {
        currentComments: updateComments,
        loading: false,
        haveMoreComment: haveMoreComment
    })
}

const deleteCommentSuccess = (state, action) => {
    const comments = [...state.currentComments];
    const commentsUpdate = comments.filter(c => {
        return c._id.toString() !== action.commentId.toString();
    }) 
    return updateObject(state, {
        currentComments: commentsUpdate
    })
} 

const addCommentSuccess = (state, action) => {
    const commentsUpdate = [...state.currentComments];
    const index = commentsUpdate.findIndex(comment => (action.comment._id.toString() === comment._id.toString()));
    if(index < 0){
        commentsUpdate.unshift(action.comment);
    }
    return updateObject(state, {currentComments: commentsUpdate});
}

const likeSuccess = (state, action) => {
    let totalUpdate = state.currentMeal.likes.total;
    if(action.mode === 'like') {
        totalUpdate += 1;
    }else if(action.mode === 'unLike'){
        totalUpdate -= 1;
    }
    totalUpdate = isNaN(totalUpdate) ? 1 : totalUpdate;
    const likesUpdate = updateObject(state.currentMeal.likes, {total: totalUpdate});
    const currentMealUpdate = updateObject(state.currentMeal, {likes: likesUpdate});
    return updateObject(state, {
        currentMeal: currentMealUpdate
    })
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MEALS_START: return fetchMealsStart(state, action);
        case actionTypes.FETCH_MEALS_SUCCESS: return fetchMealsSuccess(state, action);
        case actionTypes.FETCH_MEALS_FAIL: return fetchMealsFailed(state, action);
        case actionTypes.FETCH_ONE_MEAL_SUCCESS: return fetchOneMealSuccess(state, action);
        case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentSuccess(state, action);
        case actionTypes.DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state, action);
        case actionTypes.ADD_COMMENT_SUCCESS: return addCommentSuccess(state, action);
        case actionTypes.LIKE_SUCCESS: return likeSuccess(state, action);
        default: return state;
    }
}

export default reducer;