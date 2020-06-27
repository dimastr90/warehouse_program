import React, { useEffect, useState } from "react";
import Bases from "./Bases";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
    addItemToBase,
    createBaseInDb,
    getAllBasesList,
    getAllNotEmptyCats,
    getBaseData,
    removeBase,
    removeItemFromBase,
    renameItemInBase,
    setCurrentCatForAdd,
    setCurrentItemForAdd,
    setCurrentItemListForAdd,
    setCurrentQtyForAdd,
    setCurrentSelectedBaseData,
    setCurrentSortOrder,
    setNewBaseInputName,
    setSelectedBase,
} from "../../redux/bases-reducer";
import SortingItems from "../../modules/SortingItems";

const BasesContainer = (props) => {
    // eslint-disable-next-line
    const [listNotEmptyCats, setListNotEmptyCats] = useState(
        props.allNotEmptyCategories
    );

    useEffect(() => {
        props.getAllBasesList();
        props.getAllNotEmptyCats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listNotEmptyCats]);

    //add useToast hook and function for using him
    const { addToast } = useToasts();

    const showToast = (message, status) => {
        addToast(message, {
            appearance: status,
            autoDismiss: true,
        });
    };

    //change current "new base input" value in store
    const baseNameInputChangeHandler = (e) => {
        props.setNewBaseInputName(e.target.value);
    };

    //add new base to database(on press: 'Create new base')
    const addBaseHandler = () => {
        const name = props.newBaseInputName;
        if (!name) {
            showToast("Name field is empty", "warning");
        } else {
            props.createBaseInDb(name).then((res) => {
                if (res) {
                    props.getAllBasesList();
                    showToast("Base is created", "success");
                } else {
                    showToast("Error", "error");
                }
            });
        }
    };

    //Change current selected base(on pressing base name button)
    const changeSelectedBaseHandler = (e) => {
        const base = e.target.textContent;
        props.setSelectedBase(base);
        props.getBaseData(base);
    };

    //Change current selected category in add form. And load items for new category
    const onSelectCatHandler = (e) => {
        const newCat = e.target.value;
        const newCatItems = props.allNotEmptyCategories.filter(
            (i) => i._id === newCat
        );
        props.setCurrentCatForAdd(newCat);
        props.setCurrentItemForAdd(newCatItems[0].items[0]["name"]);
        props.setCurrentItemListForAdd(
            newCatItems[0].items.reduce((acc, i) => {
                return [...acc, i.name];
            }, [])
        );
    };

    //Change current selected item in add form
    const onSelectItemHandler = (e) => {
        props.setCurrentItemForAdd(e.target.value);
    };

    //Change current qty in add form
    const onQtyChangeHandler = (e) => {
        props.setCurrentQtyForAdd(e.target.value);
    };

    //add new item to base after clicking on "Add item" button
    const addItemButtonHandler = () => {
        const qty = props.currentQtyForAdd.trim();
        if (qty.length === 0 || !isFinite(qty)) {
            showToast("Incorrect quantity data", "warning");
        } else if (
            props.currentItemForAdd.length > 0 &&
            props.currentCatForAdd.length > 0
        ) {
            const currentCat = props.currentCatForAdd;
            const currentItem = props.currentItemForAdd;
            const allCats = props.allNotEmptyCategories;
            let id = "",
                price = "";
            for (let i of allCats) {
                if (i._id === currentCat) {
                    i.items.map((k) => {
                        if (k.name === currentItem) {
                            id = k.uniq_Id;
                            price = k.price;
                        }
                    });
                    break;
                }
            }
            props
                .addItemToBase(
                    props.selectedBase,
                    id,
                    currentCat,
                    currentItem,
                    price,
                    qty
                )
                .then((res) => {
                    if (res) {
                        props.getBaseData(props.selectedBase);
                        showToast("Item added", "success");
                    } else {
                        showToast("Error", "error");
                    }
                });
            props.setCurrentQtyForAdd("");
        }
    };

    //remove item from selected base
    const removeBaseItemHandler = (id) => {
        props.removeItemFromBase(props.selectedBase, id).then((res) => {
            if (res) {
                props.getBaseData(props.selectedBase);
                showToast("Item removed", "info");
            } else {
                showToast("Error", "error");
            }
        });
    };

    //change price and quantity in selected base
    const renameBaseItemHandler = (id, price, qty) => {
        if (qty.trim().length === 0 || price.trim().length === 0) {
            showToast("Incorrect data", "warning");
        } else {
            props
                .renameItemInBase(props.selectedBase, id, price, qty)
                .then((res) => {
                    if (res) {
                        props.getBaseData(props.selectedBase);
                        showToast("Item renamed", "info");
                    } else {
                        props.getBaseData(props.selectedBase);
                        showToast("Error", "error");
                    }
                });
        }
    };

    //Remove base from database
    const removeBaseHandler = (e) => {
        const base = e.currentTarget.dataset.name;
        props.removeBase(base).then((res) => {
            if (res) {
                props.getAllBasesList();
                if (props.selectedBase === base) {
                    props.setSelectedBase("");
                }
                showToast("Base is deleted", "info");
            } else {
                showToast("Error", "error");
            }
        });
    };

    //change current sort order
    const sortButtonsHandler = (e) => {
        const val = e.target.value;
        const sortOrder = props.currentSortOrder;
        props.setCurrentSelectedBaseData(
            SortingItems.sort(props.currentSelectedBaseData, val, sortOrder)
        );
        props.setCurrentSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <div>
            <Bases
                {...props}
                addBaseHandler={addBaseHandler}
                changeSelectedBaseHandler={changeSelectedBaseHandler}
                baseNameInputChangeHandler={baseNameInputChangeHandler}
                onQtyChangeHandler={onQtyChangeHandler}
                onSelectItemHandler={onSelectItemHandler}
                onSelectCatHandler={onSelectCatHandler}
                addItemButtonHandler={addItemButtonHandler}
                removeBaseItemHandler={removeBaseItemHandler}
                renameBaseItemHandler={renameBaseItemHandler}
                removeBaseHandler={removeBaseHandler}
                sortButtonsHandler={sortButtonsHandler}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    newBaseInputName: state.bases.newBaseInputName,
    allBasesList: state.bases.allBasesList,
    selectedBase: state.bases.selectedBase,
    allNotEmptyCategories: state.bases.allNotEmptyCategories,
    currentCatForAdd: state.bases.currentCatForAdd,
    currentItemForAdd: state.bases.currentItemForAdd,
    currentQtyForAdd: state.bases.currentQtyForAdd,
    currentItemListForAdd: state.bases.currentItemListForAdd,
    currentSelectedBaseData: state.bases.currentSelectedBaseData,
    tableHeadItems: state.bases.tableHeadItems,
    currentSortOrder: state.bases.currentSortOrder,
});

export default connect(mapStateToProps, {
    setNewBaseInputName,
    createBaseInDb,
    getAllBasesList,
    setSelectedBase,
    getAllNotEmptyCats,
    setCurrentQtyForAdd,
    setCurrentItemForAdd,
    setCurrentItemListForAdd,
    setCurrentCatForAdd,
    addItemToBase,
    getBaseData,
    removeBase,
    removeItemFromBase,
    renameItemInBase,
    setCurrentSortOrder,
    setCurrentSelectedBaseData,
})(BasesContainer);
