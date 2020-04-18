import React, {useState, useEffect} from 'react';
import NavBarAdminPage from "../Components/NavBarAdminPage"
import { Redirect } from "react-router-dom";
import { isAdmin } from "../Helper/isAdmin";
import { Link } from 'react-router-dom';

const UpdateProductPage = () => {
    
    const [products, setProducts] = useState([]);
    const [flag, setFlag] = useState(false);
    
    const backendCall = () =>{
        return fetch("/server/showproduct", {
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

    useEffect(() => {
        backendCall().then(data => {
            if(data.error){
                setFlag(true);
            }else{
                setProducts(data);
                setFlag(false);
            }
        });
    },[]);

    const backendCallToAdd = (productId) =>{
        
        return fetch(`/server/product/increasequantity/${productId}`, {
            method: 'PATCH',
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

    const backendCallToDelete = (productId) =>{
        
        return fetch(`/server/product/decreasequantity/${productId}`, {
            method: 'PATCH',
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

    const addOneQuantity = (productId) => {
        
        backendCallToAdd(productId);
        backendCall().then(data => {
            if(data.error){
                setFlag(true);
            }else{
                setProducts(data);
                setFlag(false);
            }
        });

    }

    const deleteOneQuantity = (productId, quantity) => {
        if (parseInt(quantity) > 0){
            backendCallToDelete(productId);
            backendCall().then(data => {
                if(data.error){
                    setFlag(true);
                }else{
                    setProducts(data);
                    setFlag(false);
                }
            });
        }
    }

    return (
        <div>
            <NavBarAdminPage />
            <div className = "container">
            <div className="row" >
                {products.map((product, id) => (
                    
                    <div key={id} className="col-lg-3 col-md-4 col-sm-6 col-6" style={{paddingBottom: "10px"}}>
                        <div className="card" >
                            <img
                                src={`server/product/image/${product._id}`}
                                alt=""
                                style={{ height: "200px", maxWidth: "100%" }}
                            />
                        
                        <div className="card-body">
                            <p className="card-text" style={{ fontSize:"80%" }}>
                                <b>{product.name}</b><br></br>
                                <b>Price: </b>{product.price}$<br></br>
                                <b>Available: </b>{product.available} units
                            </p>
                            <div>
                            <button onClick={() => (addOneQuantity(product._id))} className="btn-sm btn-primary" style={{ fontSize:"60%" }}>Add 1</button>
                            <button onClick={() => (deleteOneQuantity(product._id, product.available))} className="btn-sm btn-success" style={{ fontSize:"60%", marginLeft: "3px" }}>Delete 1</button>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default UpdateProductPage;