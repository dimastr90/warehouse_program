import { requestForRedux } from "../api/request";

const { request } = requestForRedux();

const SET_ALL_CATEGORIES = "SET_ALL_CATEGORIES";
const SET_ADD_ITEM_CURRENT_CAT = "SET_ADD_ITEM_CURRENT_CAT";
const SET_ADD_ITEM_NAME = "SET_ADD_ITEM_NAME";
const SET_ADD_ITEM_PRICE = "SET_ADD_ITEM_PRICE";
const SET_ALL_ITEMS = "SET_ALL_ITEMS";
const SET_CURRENT_SORT_ORDER = "SET_CURRENT_SORT_ORDER";

const initialState = {
    allCategories: [],
    allItems: [],
    addItemCurrentCat: "root",
    addItemName: "",
    addItemPrice: "",
    tableHeadItems: [
        { name: "Uniq_Id", value: "uniq_Id" },
        { name: "Category", value: "category" },
        { name: "Name", value: "name" },
        { name: "Price", value: "price" },
    ],
    currentSortOrder: "asc",
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: action.arrayWithCat,
            };
        case SET_ADD_ITEM_PRICE:
            return {
                ...state,
                addItemPrice: action.price,
            };
        case SET_ADD_ITEM_NAME:
            return {
                ...state,
                addItemName: action.name,
            };
        case SET_ADD_ITEM_CURRENT_CAT:
            return {
                ...state,
                addItemCurrentCat: action.cat,
            };
        case SET_ALL_ITEMS:
            return {
                ...state,
                allItems: action.arrayWithItems,
            };
        case SET_CURRENT_SORT_ORDER:
            return {
                ...state,
                currentSortOrder: action.newOrder,
            };
        default:
            return state;
    }
};

export const setAllCategories = (arrayWithCat) => ({
    type: SET_ALL_CATEGORIES,
    arrayWithCat,
});
export const setAllItems = (arrayWithItems) => ({
    type: SET_ALL_ITEMS,
    arrayWithItems,
});
export const setAddItemCurrentCat = (cat) => ({
    type: SET_ADD_ITEM_CURRENT_CAT,
    cat,
});
export const setAddItemName = (name) => ({ type: SET_ADD_ITEM_NAME, name });
export const setAddItemPrice = (price) => ({ type: SET_ADD_ITEM_PRICE, price });
export const setCurrentSortOrder = (newOrder) => ({
    type: SET_CURRENT_SORT_ORDER,
    newOrder,
});

//getting list of all categories from database
export const getListCategories = () => async (dispatch) => {
    try {
        const data = await request("/api/items/get/all");
        if (data) {
            let res = [];
            data.map((i) => res.push(i["_id"]));
            dispatch(setAllCategories(res));
        }
    } catch (e) {
        throw e;
    }
};

//Add new item to database
export const addItemToBase = (category, name, price) => async (dispatch) => {
    try {
        const data = await request("api/items/put/", "PUT", {
            category,
            name,
            price,
        });
        if (data) {
            dispatch(getListCategories());
            return true;
        }
    } catch (e) {}
    return false;
};

//getting list of all items from database
export const getAllItems = () => async (dispatch) => {
    try {
        const data = await request("api/items/getitems/");
        if (data) {
            dispatch(setAllItems(data));
            return true;
        }
    } catch (e) {}
    return false;
};

//delete selected item from database
export const deleteItemFromBase = (id, category) => async () => {
    try {
        await request(`/api/items/delete?id=${id}&cat=${category}`, "Delete");
        return true;
    } catch (e) {}
    return false;
};

//Editing item category in database
export const editCatInBase = (id, category, name, price, oldCat) => async () => {
    try {
        await request(`/api/items/replace/`, "PUT", {
            id,
            category,
            name,
            price,
            oldCat,
        });
        return true;
    } catch (e) {}
    return false;
};

//change item name or price
export const renameItemInBase = (id, category, name, price) => async () => {
    try {
        await request(`/api/items/rename/item`, "PUT", {
            id,
            category,
            name,
            price,
        });
        return true;
    } catch (e) {}
    return false;
};

export default itemsReducer;
