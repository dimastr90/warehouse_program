import React from "react";
import classes from "./BaseMain.module.css";
import BaseMainTable from "./BaseMainTable/BaseMainTable";

const BaseMain = (props) => {
    return (
        <>
            <div className={classes.addItemBlock}>
                <div className={classes.addItemToBaseCat}>
                    <h6>Category:</h6>
                    <select
                        className="browser-default custom-select"
                        onChange={props.onSelectCatHandler}
                    >
                        {props.allNotEmptyCategories.length > 0 &&
                            props.allNotEmptyCategories.map((i) => {
                                return (
                                    <option key={"cat-opt-key-" + i._id}>
                                        {i._id}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className={classes.addItemToBaseName}>
                    <h6>Item:</h6>
                    <select
                        className="browser-default custom-select"
                        onChange={props.onSelectItemHandler}
                    >
                        {props.allNotEmptyCategories.length > 0 &&
                            props.currentItemListForAdd.map((i) => {
                                return (
                                    <option key={"item-opt-key-" + i}>
                                        {i}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className={classes.addItemToBaseQty}>
                    <h6>Quantity:</h6>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Qty
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            value={props.currentQtyForAdd}
                            onChange={props.onQtyChangeHandler}
                        />
                    </div>
                </div>

                <div className={classes.addItemToBaseButton}>
                    <button
                        className="btn btn-success"
                        onClick={props.addItemButtonHandler}
                    >
                        Add item
                    </button>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        {props.tableHeadItems.map((i) => {
                            return (
                                <th key={"baseMain-key-" + i.value}>
                                    <button
                                        className={
                                            classes.basesTableHeadButtons
                                        }
                                        value={i.value}
                                        onClick={props.sortButtonsHandler}
                                    >
                                        {i.name}
                                        <i
                                            className="fa fa-sort"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </th>
                            );
                        })}
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.currentSelectedBaseData.map((i) => (
                        <BaseMainTable
                            key={"TableBaseDatakey-" + i.uniq_Id}
                            data={i}
                            removeBaseItemHandler={props.removeBaseItemHandler}
                            renameBaseItemHandler={props.renameBaseItemHandler}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default BaseMain;
