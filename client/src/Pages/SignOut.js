import React, {useState, useEffect} from 'react';
import NavBar from "../Components/NavBar"
import { Redirect } from "react-router-dom";
import { set } from 'mongoose';


const SignOut = () => {

    const backendCall = () => {
        return fetch("/server/signout", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.status;
        })
        .catch(err => {
            console.log(err);
        });
    };

    const backendCallToRemoveCart = (id) => {
        return fetch(`/server/cart/remove/${id}`, {
            method: 'DELETE',
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
    }

    const backendCallToAddCart = (data) => {
        return fetch("/server/cart/add", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
    }

    const logout = () => {
        let tempAdmin = JSON.parse(localStorage.getItem("admin"));
        if(tempAdmin === 0){
            let tempId = JSON.parse(localStorage.getItem("userid"));
            //console.log(tempId);
            backendCallToRemoveCart(tempId).then(data => {
                if(data.error){
                    //error
                }else{
                    //data removed
                    if(localStorage.getItem("cartItem") !== null){
                        let items = JSON.parse(localStorage.getItem("cartItem"));
                        
                        let tempItems = [];
                        items.forEach(function (item) {
                            tempItems.push({
                                "productid": item.id,
                                "name": item.name,
                                "quantity": item.quantity,
                                "available": item.available,
                                "price": item.price
                            });
                        });

                        let tempCart = {userid:tempId, productlist:tempItems};
                        
                        backendCallToAddCart(tempCart).then(data => {
                            if(data.error){
                                //error
                                
                            }else{
                                
                                if (typeof window !== 'undefined') {
                                    localStorage.removeItem('admin');
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('email');
                                    localStorage.removeItem('cartItem');
                                    localStorage.removeItem('userid');   
                                }
                                backendCall();
                            }
                        });

                    }else{
                        
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('admin');
                            localStorage.removeItem('username');
                            localStorage.removeItem('email');
                            localStorage.removeItem('cartItem');
                            localStorage.removeItem('userid');   
                        }
                        backendCall();
                    }
                }
            });
        }else{
            if (typeof window !== 'undefined') {
                localStorage.removeItem('admin');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                localStorage.removeItem('cartItem');
                localStorage.removeItem('userid');   
            }
            backendCall();
        }
        return <Redirect to="/signin" />;

    };

    return (
        <div>
            {logout()}
        </div>
    );
}

export default SignOut;