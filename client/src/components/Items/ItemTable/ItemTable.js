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
                                {props.tableHeadItems.map((i) => {
                                    return (
                                        <th  key={"itemTable-key-" + i.value}>
                                            <button
                                                className={
                                                    classes.tableHeadButton
                                                }
                                                value={i.value}
                                                onClick={
                                                    props.sortButtonsHandler
                                                }
                                            >
                                                {i.name}
                                                <i
                                                    className="fa fa-sort"
                                                    aria-hidden="true"
                                                ></i>
                                            </button>
                                        </th>
                                    );
                                })}
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.allItems.map((i) => (
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
    );
};

export default ItemTable;