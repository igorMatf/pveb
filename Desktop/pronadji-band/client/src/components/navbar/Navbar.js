import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import "./Navbar.css";
import Logo from "../../images/no-music-no-life.svg"
import AppContext from '../../contexts/AppContext';

function Navbar() {
    const {logout, user} = useContext(AppContext);
    return (
        <div className="navbar">
            <span className="navbar__logo">Pronadji bend</span>
            <img src={Logo} className="navbar__Logo" alt="logo" />

            <ul className="navbar__list" >
                <li className="navbar__item">
                    <Link to="/" className="navbar__link">Home</Link>
                </li>
                {!user ? (
                <li className="navbar__item navbar__submenu-container">
                    <button className="navbar__link">Account</button>
                    <ul className="navbar__submenu">
                        <li className="navbar__submenu-item">
                            <Link to="/auth/login" className="navbar__submenu-link">Login</Link>
                        </li>
                        <li className="navbar__submenu-item">
                            <Link to="/auth/register" className="navbar__submenu-link">Register</Link>
                        </li>
                    </ul>
                </li>
            ) : (
                <li className="navbar__item navbar__submenu-container">
                    <button className="navbar__link">{user.name}</button>
                    <ul className="navbar__submenu">
                        <li className="navbar__submenu-item">
                            <Link to="/profile" className="navbar__submenu-link">Profile</Link>
                        </li>
                        <li className="navbar__submenu-item">
                            <a  href="#" onClick={logout} className="navbar__submenu-link">Logout</a>
                        </li>
                    </ul>
                </li>
            )}
            </ul>
        </div>
    )
}

export default Navbar
