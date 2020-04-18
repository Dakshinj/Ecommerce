import React, {useState} from 'react';
import NavBar from "../Components/NavBar"
import { Redirect, NavLink } from "react-router-dom";


const SignIn = () => {
    
    const [profile, setProfile] = useState({
        username: '',
        password: '',
        msg: '',
        flag: false,
        admin: ''
    });

    const [isBlank, setIsBlank] = useState(false);

    const { username, password, msg, flag, admin } = profile;

    const inputHandler = value => event => {
        setProfile({ ...profile, [value]: event.target.value });
    };

    const backendCall = userProfile => {
        return fetch("/server/signin", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userProfile)
        })
        .then(response => {
            if(response.status === 401){
                return ({"error": "Account does not exist."});
            }else{
                return response.json();    
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const backendCallToGetCart = (id) =>{
        return fetch(`/server/cart/get/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();    
        })
        .catch(err => {
            console.log(err);
        });
    };

    const backendCallToGetPrdductById = (id) =>{
        return fetch(`/server/showproductbyid/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 400){
                return ({"error": "No Products available."});
            }else{
                return response.json();
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const clickHandler = (event) =>{
        event.preventDefault();
        if(profile.username.length === 0 || profile.password.length === 0){
            setIsBlank(true);
            setProfile({ ...profile, msg: '' });
        }else{
            setIsBlank(false);
            setProfile({ ...profile, flag: false });
            backendCall({username, password}).then(data => {
                //console.log(data.body);
                if (data.error) {
                    setProfile({ ...profile, msg: data.error});
                } else {
                    
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('admin', JSON.stringify(data.body.admin));
                        localStorage.setItem('username', JSON.stringify(data.body.username));
                        localStorage.setItem('email', JSON.stringify(data.body.email));
                        localStorage.setItem('userid', JSON.stringify(data.body._id))
                    }
                    
                    setProfile({
                        ...profile,
                        username: '',
                        password: '',
                        msg: '',
                        flag: true,
                        admin: data.body.admin
                    });
                    
                    backendCallToGetCart(data.body._id).then(data => {
                        if(data.error){
                            // error
                        }else{
                            //console.log(data);
                            if(data.length > 0){
                                let items = [];
                                for(var i = 0; i<data[0].productlist.length; i++){
                                    items.push({
                                        "id": data[0].productlist[i].productid,
                                        "quantity": data[0].productlist[i].quantity,
                                        "name": data[0].productlist[i].name,
                                        "available": data[0].productlist[i].available,
                                        "price": data[0].productlist[i].price
                                    }); 
                                }
                                localStorage.setItem("cartItem", JSON.stringify(items));
                                
                                items = JSON.parse(localStorage.getItem("cartItem"));
                                
                                for(var i = 0; i<items.length; i++){
                                    
                                    backendCallToGetPrdductById(items[i].id).then(data => {
                                        console.log(data._id);
                                        let items = JSON.parse(localStorage.getItem("cartItem"));
                                        
                                        for(var i = 0; i<items.length; i++){
                                            if(items[i].id === data._id){
                                                if(items[i].quantity > data.available){
                                                    items[i].quantity = data.available;
                                                }
                                            }
                                        }
                                        localStorage.setItem("cartItem", JSON.stringify(items));
                                    });
                                    
                                }

                            }
                        }

                    });

                }
            });
        }
    };

    const errorAlert = () => (
        <div className="alert alert-danger" style={{ display: (msg!=='')? '' : 'none' }}>
            Please check the username and password
        </div>
    );

    const noContentAlert = () => (
        <div className="alert alert-danger" style={{ display: (isBlank)? '' : 'none' }}>
            All fields should be filled.
        </div>
    )

    const redirectUser = () => {
        if(flag){
            if(admin === 0){
                return <Redirect to="/products" />;
            }else{
                return <Redirect to="/purchasehistory" />;
            }
                
        }
    }
    
    const form = () => (
        <div className="jumbotron col-md-8 offset-md-2">
            <h1 className="display-10 text-center">Sign In!</h1>
            <hr></hr>
            <div className="container col-md-8 offset-md-2">
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        onChange={inputHandler('username')}
                        className="form-control"
                        type="text"
                        placeholder="username"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={username}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        onChange={inputHandler('password')}
                        className="form-control"
                        type="password"
                        placeholder="password"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={password}
                    />
                </div>
                <div className="form-group">
                    <button onClick={clickHandler} type="submit" className="btn btn-primary btn-lg btn-block">Sign In</button>
                </div>
            </form>
            <hr></hr>
            <div className="col text-center">
                <NavLink to="/signup" style={{fontSize:"120%"}}><b>Sign Up!</b></NavLink>
            </div>
            </div>

        </div>

    );

    return (
        <div>
            <NavBar />
            <div className="container" style={{paddingTop:"10%"}}>
                {noContentAlert()}
                {errorAlert()}
                {form()}
                {redirectUser()}
            </div>
        </div>
    );
}

export default SignIn;