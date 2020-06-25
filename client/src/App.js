import React from "react";
import './App.css';
import {Route, BrowserRouter, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CategoriesContainer from "./components/Categories/CategoriesContainer";
import './App.css';
import {ToastProvider} from 'react-toast-notifications'
import ItemsContainer from "./components/Items/ItemsContainer";
import BasesContainer from "./components/Bases/BasesContainer";

function App(props) {

    return (
        <BrowserRouter>
            <ToastProvider>
                <div className="App">
                    <div className='main-content'>
                        <Navbar/>
                        <Route path='/'><Redirect to="/bases"/></Route>
                        <Route path='/bases'><BasesContainer/></Route>
                        <Route path='/categories'><CategoriesContainer/></Route>
                        <Route path='/items'><ItemsContainer/></Route>
                    </div>
                </div>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default App;
