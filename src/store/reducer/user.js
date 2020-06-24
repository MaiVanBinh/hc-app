import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    caSuccess: false,
    error: null,
    loading: false,
    user: null,
    adding: false,
    userId: null,
    role: 'user'
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true, caSuccess: false});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false,
        role: action.role
    });
}

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
}

const fetchUserSuccess = (state, action) => {
    return updateObject(state, {user: action.user});
}

const addMealIntoViewList = (state, action) => {
    return updateObject(state, {adding: true});
}

const addMealIntoViewListSuccess = (state, action) => {
    return updateObject(state, {adding: false});
}

const deleteError = (state, action) => {
    return updateObject(state, {
        error: null,
        caSuccess: false
    })
} 
const deleteMealIntoViewList = (state, action) => {
    let userUpdate;
    if(action.isViewsLike){
        const viewsMeal = [...state.user.viewsMeal];
        const viewsMealUpdate =  viewsMeal.filter(e => {
            return e._id.toString() !== action.mealId.toString();
        })
        userUpdate =  updateObject(state.user,{ viewsMeal: viewsMealUpdate});
    } else {
        const ownerMeal = [...state.user.ownerMeal];
        const ownerMealUpdate =  ownerMeal.filter(e => {
            return e._id.toString() !== action.mealId.toString();
        })
        userUpdate =  updateObject(state.user,{ ownerMeal: ownerMealUpdate});
    }
    return updateObject(state, {user: userUpdate});
}
const addNewMealSuccess = (state, action) => {
    const ownerMeal = [...state.user.ownerMeal];
    ownerMeal.unshift({...action.meal.meal});
    const userUpdate =  updateObject(state.user,{ ownerMeal: ownerMeal});
    return updateObject(state, {user: userUpdate});
}

const updateMealSuccess = (state, action) => {
    const ownerMeal = [...state.user.ownerMeal];
    for(let meal of ownerMeal){
        if(meal._id.toString() === action.meal.meal._id.toString()) {
            meal.title = action.meal.meal.title;
            meal.imageUrl = action.meal.meal.imageUrl;
        }
    }
    const userUpdate =  updateObject(state.user,{ ownerMeal: ownerMeal});
    return updateObject(state, {user: userUpdate});
}

const changeImage = (state, action) => {
    const userUpdate = updateObject(state.user, {imageUrl: action.imageUrl});
    return updateObject(state, {user: userUpdate});
}
const authLogout = (state, action) => {
    return updateObject(state, {
        userId: null,
        user: null,
        role: 'user'
    });
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.AUTH_LOGOUT: return authLogout(state, action);
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FAIL: return authFail(state, action);
        case actionType.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionType.ADD_MEAL_INTO_VIEW_LIST: return addMealIntoViewList(state, action);
        case actionType.ADD_MEAL_INTO_VIEW_LIST_SUCCESS: return addMealIntoViewListSuccess(state, action);
        case actionType.DELETE_MEAL_INTO_VIEW_LIST_SUCCESS: return deleteMealIntoViewList(state, action);
        case actionType.ADD_NEW_MEAL_SUCCESS: return addNewMealSuccess(state, action);
        case actionType.UPDATE_MEAL_SUCCESS: return updateMealSuccess(state, action);
        case actionType.DELETE_ERROR: return deleteError(state, action);
        case actionType.CHANGE_IMAGE: return changeImage(state, action); 
        default:
            return state;
    }
}

export default reducer;