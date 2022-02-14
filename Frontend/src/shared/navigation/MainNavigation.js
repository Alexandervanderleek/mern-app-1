import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./Navlinks";
import SideDrawer from './SideDrawer';
import Backdrop from "../components/UIelements/Backdrop";
import './MainNavigation.css';

const MainNavigation = (props)=>{
    const [drawIsOpen,setdrawIsOpen] = useState(false);


    const openDrawer = () => {
        setdrawIsOpen(true);
    }

    const closeDrawer = () => {
        setdrawIsOpen(false);
    }

    return(
        <Fragment>
        {drawIsOpen && <Backdrop onClick={closeDrawer}></Backdrop>}
        <SideDrawer show={drawIsOpen} onClick={closeDrawer}>
            <nav className="main-navigation__drawer-nav">
                <NavLinks></NavLinks>
            </nav>
        </SideDrawer>
        <MainHeader>
            <button className="main-navigation__menu-btn" onClick={openDrawer}>
                <span/>
                <span/>
                <span/>
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">YourPlaces</Link>
            </h1>
            <nav className="main-navigation__header-nav">
                <NavLinks></NavLinks>
            </nav>
        </MainHeader>
        </Fragment>
    )
}

export default MainNavigation;
