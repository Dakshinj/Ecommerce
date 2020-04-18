import React, {useState, useEffect} from 'react';
import NavBarUserPage from "../Components/NavBarUserPage"
import { Redirect } from "react-router-dom";
import { isAdmin } from "../Helper/isAdmin";
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    
    const [products, setProducts] = useState([]);
    const [flag, setFlag] = useState(false);
    const [keyword, setKeyword] = useState('');
    //const [outOfStock, setOutOfStock] = useState(false);

    const keyword_ = keyword;

    const inputHandler = () => event => {
        setKeyword(event.target.value);
    };

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

    const backendCallToSearch = () =>{
        return fetch(`/server/showproductbykeyword/${keyword_}`, {
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

    const searchByKeyword = () =>{
        if(keyword.length != 0){
            backendCallToSearch().then(data => {
                if(data.error){
                    setFlag(true);
                }else{
                    if(data.length != 0){
                        setProducts(data);
                        setFlag(false);
                    }else{
                        setProducts(data);
                        setFlag(true);
                    }
                }
            });
            setKeyword('');
        }else{
            backendCall().then(data => {
                if(data.error){
                    setFlag(true);
                }else{
                    setProducts(data);
                    setFlag(false);
                }
            });
        }
    };

    const addToCart = (productId, quantity, productName, productPrice) => {
        
        let items;

        if(localStorage.getItem("cartItem") !== null){

            let itemExist = false;
            items = JSON.parse(localStorage.getItem("cartItem"));
            
            items.forEach(function (item) {
                if(item['id'] === productId){
                    itemExist = true;
                    item['quantity'] = item['quantity'] + 1;
                }
            });

            if(!itemExist){
                items.push({"id":productId, "quantity":1, "available": quantity, "name": productName, "price":productPrice})
            }
            
            items.forEach(function (item) {
                if(item['available'] < item['quantity']){
                    window.confirm('Quantity needed exceeds availability');
                    item['quantity'] = item['quantity'] - 1;
                }
            });

            localStorage.setItem("cartItem", JSON.stringify(items));
            
        }else{
            
            items = [{"id":productId, "quantity":1, "available": quantity, "name": productName, "price":productPrice}];
            localStorage.setItem("cartItem", JSON.stringify(items));

        }

        //if(localStorage.getItem("totalPrice") === null){
        //    localStorage.setItem("totalPrice", productPrice);
        //}else{
        //    localStorage.setItem("totalPrice", parseInt(localStorage.getItem("totalPrice")) + productPrice);
        //}

    };

    const errorAlert = () => (
        <div className="alert alert-danger" style={{ display: (flag)? '' : 'none' }}>
            No product found!
        </div>
    )

    return (
        <div>
            <NavBarUserPage />
            <div className = "container">
            <div className="input-group mb-3">
                <input 
                    onChange={inputHandler()}
                    type="text" 
                    className="form-control" 
                    placeholder="Product name" 
                    aria-label="" 
                    aria-describedby="basic-addon1" 
                    value = {keyword_}
                />
                <div className="input-group-prepend">
                    <button onClick={searchByKeyword} className="btn btn-outline-primary" type="submit">Search</button>
                </div>
            </div>
            {errorAlert()}
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
                            <Link to={`/productbyid/${product._id}/show`}>
                            <button className="btn-sm btn-primary" style={{ fontSize:"60%" }}>Details</button>
                            </Link>
                            <button onClick={() => (addToCart(product._id, product.available, product.name, product.price))} className="btn-sm btn-success" style={{ fontSize:"60%", marginLeft: "3px" }}>Cart</button>
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

export default ProductsPage;