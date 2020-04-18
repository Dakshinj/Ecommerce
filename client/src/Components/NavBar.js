import React from "react";
import { Link, withRouter } from "react-router-dom";

const inPage = (history, endpoint) => {
    if (history.location.pathname === endpoint) {
        return { color: "yellow", fontSize:"100%" };
    } else {
        return { color: "white", fontSize:"100%" };
    }
};

const NavBar = (props) => (

    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            
            <Link className="navbar-brand" to="/" >
                Ecommerce
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    <Link className = "navbar-brand" to="/signin" style={inPage(props.history, "/signin")}>
                        Sign In
                    </Link>
                    </li>
                    <li className="nav-item active">
                    <Link className = "navbar-brand" to="/signup" style={inPage(props.history, "/signup")}>
                        Sign Up
                    </Link>
                    </li>
                </ul>
            </div>
        
        </nav>
        <hr></hr>
    </div>

);

export default withRouter(NavBar);