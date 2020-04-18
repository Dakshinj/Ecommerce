import React from 'react';
import NavBar from "../Components/NavBar"
import { NavLink } from "react-router-dom";


const HomePage = () => {

    const page = () => (
        <div className="jumbotron col-md-8 offset-md-2">
            <h1 className="display-10 text-center">Welcome!</h1>
            <hr></hr>
            <form>
                <div className="container col-md-6 offset-md-3">
                <div className="row">
                    <div className="col text-center">
                        <NavLink to="/signin" style={{fontSize:"150%"}}><b>Sign In</b></NavLink>
                    </div>
                    <div className="col text-center">
                        <NavLink to="/signup" style={{fontSize:"150%"}}><b>Sign Up</b></NavLink>
                    </div>
                </div>
                </div>
            </form>
        </div>
    )

    return (
        <div>
            <NavBar />
            <div className="container" style={{paddingTop:"10%"}}>
            {page()}
            </div>
        </div>
    );
}

export default HomePage;