import React, {useState, useEffect} from 'react';
import NavBarUserPage from "../Components/NavBarUserPage"
import { Redirect } from "react-router-dom";
import { isAdmin } from "../Helper/isAdmin";
import { Link } from 'react-router-dom';

const ProductByIdPage = (props) => {
    
    const [product, setProduct] = useState([]);
    const [flag, setFlag] = useState(false);
    
    const backendCall = () =>{
        return fetch(`/server/showproductbyid/${props.match.params.id}`, {
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
                //console.log(data);
                setProduct(data);
                setFlag(false);
            }
        });
    },[]);

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

    };

    return (
        <div>
            <NavBarUserPage />
            <div className="container" style={{ paddingTop: "50px", width: "80%"}}>
                <div style={{textAlign: "center"}}>
                <img
                    src={`/server/product/image/${props.match.params.id}`}
                    alt=""
                    style={{ maxHeight: "500px", maxWidth: "100%"}}
                />
                </div>
                <hr></hr>
                <h4>
                    {product.name}
                </h4>
                <br></br>
                <p>
                    <b>Price: </b> {product.price}$
                </p>
                <p>
                    <b>Available: </b> {product.available} Unit(s)
                </p>
                <p>
                    <b>Description: </b><br></br>
                    {product.description}
                </p>
                <button onClick={() => (addToCart(product._id, product.available, product.name, product.price))} className="btn-sm btn-success" style={{ fontSize:"100%", marginLeft: "3px" }}>Add to Cart</button>
                <hr></hr>
            </div>
        </div>
    );
};

export default ProductByIdPage;