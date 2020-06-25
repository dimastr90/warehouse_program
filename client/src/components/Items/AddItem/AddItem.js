import React from "react";
import classes from "./AddItem.module.css";


const AddItem = (props) => {

    return (
        <div>
            <div className={classes.addItemForm}>
                <h4 className={classes.addItemHeader}>Add item:</h4>
                <div className={classes.addItemCat}>
                    <select className="browser-default custom-select" value={props.addItemCurrentCat}
                            onChange={props.onCategorySelectHandler}>
                        {props.allCategories.map(item => (
                            <option key={"addItemForm-" + item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.addItemName}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Default"
                               aria-describedby="inputGroup-sizing-default" value={props.addItemName}
                               onChange={props.onNameChangeHandler}/>
                    </div>
                </div>
                <div className={classes.addItemPrice}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Price</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Default"
                               aria-describedby="inputGroup-sizing-default" value={props.addItemPrice}
                               onChange={props.onPriceChangeHandler}/>
                    </div>
                </div>
                <div className={classes.addItemButton}>
                    <button className="btn btn-success" onClick={props.addItemToBaseHandler}>Add item</button>
                </div>
            </div>
        </div>
    )
};

export default AddItem;