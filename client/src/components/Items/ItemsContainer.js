import React, {useEffect, useState} from "react";
import Items from "./Items";
import {connect} from "react-redux";
import {
    addCatToBase, deleteItemFromBase, editCatInBase, getAllItems,
    getListCategories, renameItemInBase,
    setAddItemCurrentCat,
    setAddItemName,
    setAddItemPrice, setAllItems, setCurrentSortOrder
} from "../../redux/items-reducer";
import {useToasts} from "react-toast-notifications";
import SortingItems from "../../modules/SortingItems";


const ItemsContainer = (props) => {
    // eslint-disable-next-line
    const [listCats,setListCats] = useState(props.currentRootCategories);

    useEffect(() => {
        props.getListCategories();
        props.getAllItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listCats]);

    const {addToast} = useToasts();

    const showToast = (message, status) => {
        addToast(message, {
            appearance: status,
            autoDismiss: true,
        })
    };

    const addItemToBaseHandler = () => {
        props.addCatToBase(props.addItemCurrentCat, props.addItemName, props.addItemPrice)
            .then(res => {
                if (res) {
                    props.getAllItems();
                    showToast('Category is added', 'success');
                } else {
                    showToast('Error', 'error');
                }
            });
        props.setAddItemPrice('');
        props.setAddItemName('');
    };

    const deleteItemHandler = (id, category) => {
        props.deleteItemFromBase(id, category)
            .then(res => {
                if (res) {
                    props.getAllItems();
                    showToast('Category is deleted', 'info');
                } else {
                    showToast('Error', 'error');
                }
            });
    };

    const editItemCatInBase = (id, category, name, price, oldCat) => {
        props.editCatInBase(id, category, name, price, oldCat)
            .then(res => {
                if (res) {
                    props.getAllItems();
                    showToast('Category is replaced', 'info');
                } else {
                    showToast('Error', 'error');
                }
            })
    };

    const renameItemHandler = (id, category, name, price) => {
        props.renameItemInBase(id, category, name, price)
            .then(res => {
                if (res) {
                    props.getAllItems();
                    showToast('Item data is renamed', 'info');
                } else {
                    showToast('Error', 'error');
                }
            })
    };

    const sortButtonsHandler = (e) => {
        const val = e.target.value;
        const sortOrder = props.currentSortOrder;
        props.setAllItems(SortingItems.sort(props.allItems, val, sortOrder));
        props.setCurrentSortOrder(sortOrder==='asc' ? 'desc' : 'asc');
    };


    const onNameChangeHandler = (e) => {
        props.setAddItemName(e.target.value);
    };

    const onPriceChangeHandler = (e) => {
        props.setAddItemPrice(e.target.value);
    };
    const onCategorySelectHandler = (e) => {
        props.setAddItemCurrentCat(e.target.value);
    };


    return (
        <>
            <Items {...props} addItemToBaseHandler={addItemToBaseHandler} deleteItemHandler={deleteItemHandler}
                   editItemCatInBase={editItemCatInBase}
                   renameItemHandler={renameItemHandler}
                   onNameChangeHandler={onNameChangeHandler}
                   onPriceChangeHandler={onPriceChangeHandler}
                   onCategorySelectHandler={onCategorySelectHandler}
                   sortButtonsHandler={sortButtonsHandler}/>
        </>
    )
}


const mapStateToProps = (state) => ({
    allCategories: state.items.allCategories,
    addItemCurrentCat: state.items.addItemCurrentCat,
    addItemName: state.items.addItemName,
    addItemPrice: state.items.addItemPrice,
    allItems: state.items.allItems,
    tableHeadItems: state.items.tableHeadItems,
    currentSortOrder: state.items.currentSortOrder
})


export default connect(mapStateToProps, {
    getListCategories,
    setAddItemCurrentCat,
    setAddItemName,
    setAddItemPrice,
    addCatToBase,
    getAllItems,
    deleteItemFromBase,
    editCatInBase,
    setAllItems,
    setCurrentSortOrder
})(ItemsContainer);