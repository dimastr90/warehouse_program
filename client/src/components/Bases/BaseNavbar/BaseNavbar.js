import React, {Fragment} from "react";
import classes from './BaseNavbar.module.css'


const BaseNavbar = (props) => {

    return (
        <>
            <div className={classes.navbar}>
                <div className={classes.addBase}>
                    <label htmlFor="exampleForm2">Enter new base name:</label>
                    <input type="text" id="exampleForm2" value={props.newBaseInputName}
                           onChange={props.baseNameInputChangeHandler} className="form-control"/>
                    <div className={classes.addBaseButton}>
                        <button type="button" className="btn btn-primary" onClick={props.addBaseHandler}>Create new
                            base
                        </button>
                    </div>
                </div>


                <div className={classes.basesNames}>
                    <h5>All bases list:</h5>
                    <ul className={classes.listBases}>
                        {props.allBasesList.map(i => {
                            return (
                                <Fragment key={'base-list-key' + i}>
                                    <li>
                                    <button key={'button-key-' + i} type="button" onClick={props.changeSelectedBaseHandler} className={`btn btn-${props.selectedBase === i ? 'success' : 'light'} ${classes.baseButton}`}>{i}</button>
                                    <button
                                        key={'edit-base-key-' + i}
                                        className={classes.editBaseNameButton}
                                        data-name={i}
                                        onClick={props.removeBaseHandler}
                                    >
                                        <i className="fas fa-minus-circle"/>
                                    </button>
                                    </li>
                                </Fragment>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
};


export default BaseNavbar