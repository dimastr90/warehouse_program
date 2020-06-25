import React, {useEffect, useState} from "react";
import Categories from "./Categories";
import {
    addCategoryToDB,
    changeAddCatText, changeListCurrentRoot, deleteCategoryFromDB,
    getRootCategories,
    removeFromCurrentWay,
} from "../../redux/categories-reducer";
import {connect} from "react-redux";
import {useToasts} from "react-toast-notifications";



const CategoriesContainer = (props) => {
    const [listCats, setListCats] = useState(props.currentRootCategories);

    const {addToast} = useToasts();

    useEffect(() => {
        props.getRootCategories();
        setListCats(props.currentRootCategories);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[listCats]);


    const showToast = (message, status) => {
        addToast(message, {
            appearance: status,
            autoDismiss: true,
        })
    };


    const addCatHandler = () => {
        props.addCategoryToDB(props.addCatText, props.catListCurrentRoot)
            .then(res=>{
                if(res){
                   showToast('Category is added','success');
                }else{
                    showToast('Error','error');
                }
            });
        props.changeAddCatText('');
    };

    const selectCatHandler = (e) => {
        const value = e.currentTarget.text;
        const way = props.currentWay;
        if (value === '...') {
            if (way.length >= 2) {
                props.getRootCategories(way[way.length - 2]);
                props.removeFromCurrentWay();
            }
        } else {
            props.getRootCategories(value);
        }
    }

    const deleteCatHandler = () =>{
        const way = props.currentWay;

        props.deleteCategoryFromDB(props.catListCurrentRoot);
        props.getRootCategories(way[way.length - 2]);
        props.removeFromCurrentWay();
    }

    const textAddOnChangeHandler = (e) =>{
        props.changeAddCatText(e.target.value);
    };


        return (
            <div>
                <Categories {...props} selectCatHandler={selectCatHandler}
                            addCatHandler={addCatHandler}
                            deleteCatHandler={deleteCatHandler}
                            textAddOnChangeHandler={textAddOnChangeHandler}/>
            </div>
        )
}

const mapStateToProps = (state) => ({
    catListCurrentRoot: state.categories.catListCurrentRoot,
    currentRootCategories: state.categories.currentRootCategories,
    currentWay: state.categories.currentWay,
    addCatText: state.categories.addCatText
})

export default connect(mapStateToProps, {
    getRootCategories,
    removeFromCurrentWay,
    changeAddCatText,
    addCategoryToDB,
    deleteCategoryFromDB,
    changeListCurrentRoot
})(CategoriesContainer);