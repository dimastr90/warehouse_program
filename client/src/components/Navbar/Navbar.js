import React from "react";
import {NavLink} from "react-router-dom";
import classes from './Navbar.module.css'

const Navbar = (props) => {
    return (
        <div>
            <nav className={`navbar navbar-expand navbar-dark bg-primary ${classes.navForm}`}>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to='/bases' className="navbar-brand">Bases</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/categories' className="navbar-brand">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/items"} className="navbar-brand">Items</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}


export default Navbar;