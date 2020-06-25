import React from "react";
import classes from "./ItemTable.module.css";
import TableData from "./TableData";


const ItemTable = (props) => {
    return (
        <>
            <div className={classes.itemTable}>
                <h4 className={classes.itemTableHeader}>All items:</h4>
                <div className={classes.table}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Uniq_ID</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.allItems.map(i => (
                        <TableData
                            key={"TableDatakey-" + i.uniq_Id}
                            data={i}
                            update={props.updateState}
                            categories={props.allCategories}
                            deleteItemHandler={props.deleteItemHandler}
                            editItemCatInBase={props.editItemCatInBase}
                            renameItemHandler={props.renameItemHandler}
                        />
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
};

export default ItemTable;