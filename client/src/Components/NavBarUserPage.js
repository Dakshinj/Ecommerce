import React from "react";
import { Link, withRouter } from "react-router-dom";

const inPage = (history, endpoint) => {
    if (history.location.pathname === endpoint) {
        return { color: "yellow", fontSize:"100%" };
    } else {
        return { color: "white", fontSize:"100%" };
    }
};

const NavBarUserPage = (props) => (

    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            
            <Link className="navbar-brand" to="/products" >
                Ecommerce
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    <Link className = "navbar-brand" to="/products" style={inPage(props.history, "/products")}>
                        Products
                    </Link>
                    </li>
                    <li className="nav-item active">
                    <Link className = "navbar-brand" to="/cart" style={inPage(props.history, "/cart")}>
                        To Cart
                    </Link>
                    </li>
                </ul>
                <ul className="navbar-nav navbar-right">
                    <li className="nav-item active">
                    <Link className = "navbar-brand" to="/signout" style={{fontSize:"100%"}}>
                        Sign out
                    </Link>
                    </li>
                </ul>
            </div>
        
        </nav>
        <hr></hr>
    </div>

);

export default withRouter(NavBarUserPage);