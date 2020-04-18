import React from "react";
import { Link, withRouter } from "react-router-dom";

const inPage = (history, endpoint) => {
    if (history.location.pathname === endpoint) {
        return { color: "yellow", fontSize:"100%" };
    } else {
        return { color: "white", fontSize:"100%" };
    }
};

const NavBarAdminPage = (props) => (

    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            
            <Link className="navbar-brand" to="/purchasehistory" >
                Dashboard
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    <Link className = "navbar-brand" to="/purchasehistory" style={inPage(props.history, "/purchasehistory")}>
                        Purchase Histroy
                    </Link>
                    </li>
                    <li className="nav-item active">
                    <Link className = "navbar-brand" to="/addproducts" style={inPage(props.history, "/addproducts")}>
                        Add Products
                    </Link>
                    </li>
                    <li className="nav-item active">
                    <Link className = "navbar-brand" to="/updateproduct" style={inPage(props.history, "/updateproduct")}>
                        Update Products
                    </Link>
                    </li>
                    <li className="nav-item active">
                    <Link className = "navbar-brand" to="/addadmin" style={inPage(props.history, "/addadmin")}>
                        Add Admin
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

export default withRouter(NavBarAdminPage);