import React from 'react';
import { Link } from "react-router-dom";
import "../CSS/navbar.css";

const Nav = () => {

    return (
        <header>
            <Link to='/'>
                <div className="logo-wrapper" alt='logo'>
                    <h3>PetPurrsuit<span style={{ color:'#5E3DD3'}}>.com</span></h3>
                </div>
            </Link>
            <nav>
                <div className="rightside">
                    <Link className="rightsideLink" to="/" >Home</Link>
                    <Link className="rightsideLink" to="/donate">Donate</Link>
                    <Link className="rightsideLink" to="/about">About</Link>
                </div> 
            </nav>
        </header>
    )
}


export default Nav;