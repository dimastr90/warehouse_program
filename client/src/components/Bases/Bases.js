import React from "react";
import BaseNavbar from "./BaseNavbar/BaseNavbar";
import classes from './Bases.module.css';
import BaseMain from "./BaseMain/BaseMain";


const Bases = (props) =>{
    return(
        <div>
        <div className={classes.navbar}>
            <BaseNavbar {...props} />
        </div>
            <div className={classes.mainContainer}>
                {props.selectedBase !== '' && <BaseMain {...props}/>}
            </div>
        </div>
    )
}

export default Bases;