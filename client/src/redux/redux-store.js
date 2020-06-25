import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import categoriesReducer from "./categories-reducer";
import itemsReducer from "./items-reducer";
import basesReducer from "./bases-reducer";


let reducers = combineReducers({
    categories: categoriesReducer,
    items: itemsReducer,
    bases: basesReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;