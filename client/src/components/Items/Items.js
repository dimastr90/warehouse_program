import React from "react";
import classes from './Items.module.css'
import AddItem from "./AddItem/AddItem";
import ItemTable from "./ItemTable/ItemTable";


const Items = (props) => {


    return (
        <div>
            <div className={classes.addFormContainer}>
                <AddItem {...props} />
                <ItemTable {...props}/>
            </div>
        </div>
    )
}

export default Items;