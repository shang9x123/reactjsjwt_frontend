import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './home'
import AuthUser from './AuthUser'
import { Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'

const Mynavbar = () => {
    const { token, logoutToken } = AuthUser();
    const [cookies, removeCookie] = useCookies(['token']);
    const logoutUser = () => {
        logoutToken();

    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/#">
                    My navbar
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/#">
                                Pricing
                            </NavLink>
                        </li>
                        {cookies.token && (
                            <>
                                <li li className="nav-item">
                                    <NavLink className="nav-link" >
                                        <span role="button" className="nav-link" onClick={logoutUser}>Logout</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                </div>
            </nav >
        </div >
    )
}

export default Mynavbar
