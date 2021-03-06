import { requestForRedux } from "../api/request";

const { request } = requestForRedux();

const CHANGE_NEW_BASE_INPUT_NAME = "CHANGE_NEW_BASE_INPUT_NAME";
const SET_ALL_BASES_LIST = "SET_ALL_BASES_LIST";
const CHANGE_SELECTED_BASE = "CHANGE_SELECTED_BASE";
const SET_ALL_NOT_EMPTY_CATS = "SET_ALL_NOT_EMPTY_CATS";
const SET_CURRENT_CAT_FOR_ADD = "SET_CURRENT_CAT_FOR_ADD";
const SET_CURRENT_ITEM_FOR_ADD = "SET_CURRENT_ITEM_FOR_ADD";
const SET_CURRENT_QTY_FOR_ADD = "SET_CURRENT_QTY_FOR_ADD";
const SET_CURRENT_ITEM_LIST_FOR_ADD = "SET_CURRENT_ITEM_LIST_FOR_ADD";
const SET_CURRENT_SELECTED_BASE_DATA = "SET_CURRENT_SELECTED_BASE_DATA";
const SET_CURRENT_SORT_ORDER = "SET_CURRENT_SORT_ORDER";

const initialState = {
    newBaseInputName: "",
    allBasesList: [],
    selectedBase: "",
    allNotEmptyCategories: [],
    currentItemListForAdd: [],
    currentCatForAdd: "",
    currentItemForAdd: "",
    currentQtyForAdd: "",
    currentSelectedBaseData: [],
    tableHeadItems: [
        { name: "Uniq_Id", value: "uniq_Id" },
        { name: "Category", value: "category" },
        { name: "Name", value: "name" },
        { name: "Price", value: "price" },
        { name: "Quantity", value: "qty" },
    ],
    currentSortOrder: "asc",
};

const basesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_NEW_BASE_INPUT_NAME:
            return {
                ...state,
                newBaseInputName: action.text,
            };
        case SET_ALL_BASES_LIST:
            return {
                ...state,
                allBasesList: [...action.array],
            };
        case CHANGE_SELECTED_BASE:
            return {
                ...state,
                selectedBase: action.name,
            };
        case SET_ALL_NOT_EMPTY_CATS:
            return {
                ...state,
                allNotEmptyCategories: action.array,
            };
        case SET_CURRENT_CAT_FOR_ADD:
            return {
                ...state,
                currentCatForAdd: action.cat,
            };
        case SET_CURRENT_ITEM_FOR_ADD:
            return {
                ...state,
                currentItemForAdd: action.item,
            };
        case SET_CURRENT_QTY_FOR_ADD:
            return {
                ...state,
                currentQtyForAdd: action.qty,
            };
        case SET_CURRENT_ITEM_LIST_FOR_ADD:
            return {
                ...state,
                currentItemListForAdd: action.itemList,
            };
        case SET_CURRENT_SELECTED_BASE_DATA:
            return {
                ...state,
                currentSelectedBaseData: [...action.data],
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

export const setNewBaseInputName = (text) => ({
    type: CHANGE_NEW_BASE_INPUT_NAME,
    text,
});

export const setAllBasesList = (array) => ({ type: SET_ALL_BASES_LIST, array });

export const setSelectedBase = (name) => ({ type: CHANGE_SELECTED_BASE, name });

export const setAllNotEmptyCategories = (array) => ({
    type: SET_ALL_NOT_EMPTY_CATS,
    array,
});

export const setCurrentCatForAdd = (cat) => ({
    type: SET_CURRENT_CAT_FOR_ADD,
    cat,
});

export const setCurrentItemForAdd = (item) => ({
    type: SET_CURRENT_ITEM_FOR_ADD,
    item,
});

export const setCurrentItemListForAdd = (itemList) => ({
    type: SET_CURRENT_ITEM_LIST_FOR_ADD,
    itemList,
});

export const setCurrentQtyForAdd = (qty) => ({
    type: SET_CURRENT_QTY_FOR_ADD,
    qty,
});

export const setCurrentSelectedBaseData = (data) => ({
    type: SET_CURRENT_SELECTED_BASE_DATA,
    data,
});

export const setCurrentSortOrder = (newOrder) => ({
    type: SET_CURRENT_SORT_ORDER,
    newOrder,
});

export const createBaseInDb = (name) => async () => {
    try {
        await request("/api/bases/create", "POST", { name });
        return true;
    } catch (e) {}
    return false;
};

export const getAllBasesList = () => async (dispatch) => {
    try {
        const data = await request("/api/bases/get/all", "GET");
        dispatch(setAllBasesList(data));
    } catch (e) {}
};

//getting all not empty categories from database and set default chosen category
export const getAllNotEmptyCats = () => async (dispatch) => {
    try {
        const data = await request("/api/items/get/all", "GET");
        if (data) {
            const result = data.filter((i) => i.items.length > 0);

            if (result.length > 0) {
                dispatch(setAllNotEmptyCategories(result));
                dispatch(setCurrentCatForAdd(result[0]._id));
                dispatch(setCurrentItemForAdd(result[0].items[0].name));
                dispatch(
                    setCurrentItemListForAdd(
                        result[0].items.reduce((acc, i) => {
                            return [...acc, i.name];
                        }, [])
                    )
                );
            }
        }
    } catch (e) {}
};

//add new item to database
export const addItemToBase = (base, id, category, name, price, qty) => async () => {
    try {
        await request("api/bases/add/item", "POST", {
            base,
            id,
            category,
            name,
            price,
            qty,
        });
        return true;
    } catch (e) {}
    return false;
};

//get items from selected base
export const getBaseData = (base) => async (dispatch) => {
    try {
        const data = await request("api/bases/get/base" + base);
        dispatch(setCurrentSelectedBaseData(data));
        return true;
    } catch (e) {}
    return false;
};

//removing base from database
export const removeBase = (base) => async () => {
    try {
        await request("api/bases/remove/base" + base, "DELETE");
        return true;
    } catch (e) {}
    return false;
};

//remove item from base by id
export const removeItemFromBase = (base, id) => async () => {
    try {
        await request(`api/bases/remove/item?base=${base}&id=${id}`, "DELETE");
        return true;
    } catch (e) {}
    return false;
};

//rename some item in base
export const renameItemInBase = (base, id, price, qty) => async () => {
    try {
        await request("api/bases/update/item", "PUT", { base, id, price, qty });
        return true;
    } catch (e) {}
    return false;
};

export default basesReducer;
