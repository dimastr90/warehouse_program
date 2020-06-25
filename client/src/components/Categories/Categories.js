import React from "react";
import classes from './Categories.module.css';



const Categories = (props) => {


    const deleteEnabled = props.catListCurrentRoot==='root' ? true : false;

    return (
        <div>
            <div className={classes.addCatForm}>
                <h4>Create new category</h4>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter category name"
                            onChange={props.textAddOnChangeHandler} value={props.addCatText}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={props.addCatHandler}>Create category</button>
                        </div>
                </div>


                <div className={`list-group ${classes.listCat}`}>
                    <h4>Select parent category:</h4>
                    <a className="list-group-item list-group-item-action active" onClick={props.selectCatHandler}>...</a>
                    {props.currentRootCategories.map(i=>
                        <a className="list-group-item list-group-item-action" key={'key'+i._id} onClick={props.selectCatHandler}>{i._id}</a>)}
                        <div>
                            <h5>Current category:</h5>
                            <div className={classes.wayItem}>
                            {props.currentWay.map(i=> {
                                return i+'->'
                            })}
                        </div>
                        </div>
                    <button type="button" className="btn btn-danger btn-lg btn-block" disabled={deleteEnabled} onClick={props.deleteCatHandler}>Delete selected category</button>
                </div>
            </div>
        </div>
    )
}

export default Categories;