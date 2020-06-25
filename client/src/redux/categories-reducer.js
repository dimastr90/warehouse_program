import {requestForRedux} from '../api/request';

const {request} = requestForRedux();

const CHANGE_LIST_CURRENT_ROOT = 'CHANGE_LIST_CURRENT_ROOT';
const SET_CURRENT_ROOT_CATEGORIES = 'SET_CURRENT_ROOT_CATEGORIES';
const CHANGE_CURRENT_WAY_ADD = 'CHANGE_CURRENT_WAY_ADD';
const CHANGE_CURRENT_WAY_REM = 'CHANGE_CURRENT_WAY_REM';
const CHANGE_ADD_CAT_TEXT = 'CHANGE_ADD_CAT_TEXT';

const initialState = {
    catListCurrentRoot: 'root',
    currentRootCategories: [],
    currentWay:[],
    addCatText:'',
    currentToastMessageAndType:{message:'', status:'error'},
};


const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LIST_CURRENT_ROOT:
            return {
                ...state,
                catListCurrentRoot: action.catName
            };
        case SET_CURRENT_ROOT_CATEGORIES:
            return {
                ...state,
                currentRootCategories: action.newList
            };
        case CHANGE_CURRENT_WAY_ADD:
            if(state.currentWay[state.currentWay.length-1]!==action.newItem) {
                return {
                    ...state,
                    currentWay: [...state.currentWay, action.newItem]
                }
            }else{
                return{
                    ...state,
                    currentWay: [...state.currentWay]
                }
            }
        case CHANGE_CURRENT_WAY_REM:
            let changedCurrentWay=[...state.currentWay];
            changedCurrentWay.pop();
            return{
                ...state,
                currentWay: changedCurrentWay
            };
        case CHANGE_ADD_CAT_TEXT:
            return{
                ...state,
                addCatText: action.newText
            };
        default:
            return state;
    }
};


export const changeAddCatText = (newText) => ({type: CHANGE_ADD_CAT_TEXT, newText})
export const changeListCurrentRoot = (catName) => ({type: CHANGE_LIST_CURRENT_ROOT, catName});

export const setCurrentRootCategories = (newList) => ({type: SET_CURRENT_ROOT_CATEGORIES, newList});

export const addToCurrentWay = (newItem) => ({type:CHANGE_CURRENT_WAY_ADD, newItem});
export const removeFromCurrentWay = () => ({type:CHANGE_CURRENT_WAY_REM});

export const getRootCategories = (catName = "root") => async (dispatch) => {
    try {
        const data = await request('/api/cat/get'+catName);

        dispatch(setCurrentRootCategories(data));
        dispatch(changeListCurrentRoot(catName));
        dispatch(addToCurrentWay(catName));

    } catch (e) {
        throw e;
    }
}

export const addCategoryToDB = (_id, parent, toast) => async (dispatch) => {
    let data;
    try {
        data = await request('/api/cat/add', 'POST', {_id, parent});
    } catch (e) {
    }

    if(data){
        dispatch(getRootCategories(parent));
        return true;
    }else{
        return false;
    }

}


export const deleteCategoryFromDB = (id) => async (dispatch) => {
    try {
        return await request('/api/cat/delete'+id, 'DELETE');
    } catch (e) {

    }
}


export default categoriesReducer;