import React, {useState, useEffect} from 'react';
import NavBarUserPage from "../Components/NavBarUserPage"
import { Redirect } from "react-router-dom";
import { isAdmin } from "../Helper/isAdmin";
import { Link } from 'react-router-dom';
import { set } from 'mongoose';

const CartPage = () => {

    const [products, setProducts] = useState([]);
    const [noItemInCart, setNoItemInCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [history, setHistory] = useState({
        ordernumber: 0,
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        country: '',
        state: '',
        zip: '',
        totalprice: 0,
        productlist: []
    });
    const [cardDetail, setCardDetail] = useState({
        nameOnCard: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });
    const [ redirectFlag, setRedirectFlag ] = useState(false);
    const [isBlank, setIsBlank] = useState(false);

    const { firstname, lastname, email, address, country, state, zip } = history;

    const { nameOnCard, cardNumber, expirationDate, cvv } = cardDetail;

    const backendCallByProductId = (id) =>{
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

    const backendCallWriteHistory = () => {
        return fetch("/server/addhistory", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(history)
        })
        .then(response => {
            if(response.status === 400){
                return ({"error": "Not added"});
            }else{
                return response.json();    
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const backendCallToReduceProductCount = (productId) => {
        return fetch(`/server/product/decreasequantity/${productId}/user`, {
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
    }    

    const backendCallGetMaxOrderNumber = () => {
        return fetch("/server/getordernumbermax", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            //console.log(response);
            return response.json();    
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {

        let tempOrderNumber = 0;
        backendCallGetMaxOrderNumber().then(data => {
            //console.log(data );
            if(data !== null){
                if(data.error){
                    // Error
                }else{
                    tempOrderNumber = data.ordernumber + 1;
                }
            }
        });   

        let tempProducts = [];
        let tempTotalPrice = 0;
        let tempProductList = [];
        let productListName = '';
        let productListQuantity = 0;
        let productListUnitPrice = 0;
        if(localStorage.getItem("cartItem") !== null){
            let items = JSON.parse(localStorage.getItem("cartItem"));
            
            items.forEach(function (item) {
                productListName = item.name;
                productListQuantity = item.quantity;
                productListUnitPrice = item.price;
                tempProductList.push({name: productListName, quantity: productListQuantity, unitprice: productListUnitPrice})
                
                for(let i = 0; i<item['quantity']; i++){
                    backendCallByProductId(item['id']).then(data => {
                        if(data.error){
                            // Error
                        }else{
                            
                            tempProducts.push(data);
                            tempTotalPrice = tempTotalPrice + data['price'];
                            setTotalPrice(tempTotalPrice);
                            setProducts(tempProducts);
                            setNoItemInCart(false);
                            //setHistory({ ...history, ['totalprice']: tempTotalPrice });
                            setHistory({ ...history, ['productlist']: tempProductList, ['totalprice']: tempTotalPrice, ['ordernumber']: tempOrderNumber});
                        }
                    });
                }  
            });
        }

    },[]);

    const inputHandler = value => event => {
        localStorage.setItem(value, JSON.stringify(event.target.value));
        setHistory({ ...history, [value]: event.target.value });
    };

    const inputHandlerCard = value => event => {
        setCardDetail({ ...cardDetail, [value]: event.target.value});
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

    const clickHandler = (event) => {
        event.preventDefault();
        //console.log(history);
        if(history.firstname.length === 0 || history.lastname.length === 0 || history.email.length === 0 || history.address.length === 0 || history.country.length === 0 || history.state.length === 0 || history.zip.length === 0 || cardDetail.nameOnCard.length === 0 || cardDetail.cardNumber.length === 0 || cardDetail.expirationDate.length === 0 || cardDetail.cvv.length ===0){
            setIsBlank(true);
        }else{
            setIsBlank(false);
            if(localStorage.getItem("cartItem") !== null){
                backendCallWriteHistory().then(data => {
                    if (data.error) {
                        //console.log(data.error);
                    } else {
                        
                        setHistory({
                            ordernumber: 0,
                            firstname: '',
                            lastname: '',
                            email: '',
                            address: '',
                            country: '',
                            state: '',
                            zip: '',
                            totalprice: 0,
                            productlist: []
                        });

                        let items = JSON.parse(localStorage.getItem("cartItem"));                

                        items.forEach(function (item) {    
                            for(let i = 0; i<item['quantity']; i++){
                                backendCallToReduceProductCount(item.id).then(data => {
                                    if (data.error) {
                                        // Error
                                    } else {
                                        // Success
                                    }
                                });
                            }
                        });

                        let tempId = JSON.parse(localStorage.getItem("userid"));

                        backendCallToRemoveCart(tempId).then(data => {
                            if(data.error){
                                //error
                            }else{

                            }
                        });                

                        
                        //localStorage.removeItem('cartItem');
                        //localStorage.setItem("checkoutItem", JSON.stringify(items));
                        window.location.assign('/checkout');
                        setRedirectFlag(true);
                    }
                });
            }
        }
    };

    const addOne = (productId) => {
        
        let items;
        items = JSON.parse(localStorage.getItem("cartItem"));
        items.forEach(function (item) {
            if(item['id'] === productId){
                item['quantity'] = item['quantity'] + 1;
            }
        });

        items.forEach(function (item) {
            if(item['available'] < item['quantity']){
                window.confirm('Quantity needed exceeds availability');
                item['quantity'] = item['quantity'] - 1;
            }
        });
        
        localStorage.setItem("cartItem", JSON.stringify(items));
        
        let tempProducts = [];
        let tempTotalPrice = 0;
        let tempProductList = [];
        let productListName = '';
        let productListQuantity = 0;
        let productListUnitPrice = 0;
        items.forEach(function (item) {
            productListName = item.name;
            productListQuantity = item.quantity;
            productListUnitPrice = item.price;
            tempProductList.push({name: productListName, quantity: productListQuantity, unitprice: productListUnitPrice})
            for(let i = 0; i<item['quantity']; i++){
                backendCallByProductId(item['id']).then(data => {
                    if(data.error){
                        // Error
                    }else{
                        
                        tempProducts.push(data);
                        tempTotalPrice = tempTotalPrice + data['price'];
                        setTotalPrice(tempTotalPrice);
                        setProducts(tempProducts);
                        setNoItemInCart(false);
                        //setHistory({ ...history, ['totalprice']: tempTotalPrice });
                        setHistory({ ...history, ['productlist']: tempProductList, ['totalprice']: tempTotalPrice });
                    }
                });
            }
        });

    };

    const removeOne = (productId) => {
        
        let items;
        let quantityZeroFlag = false;
        items = JSON.parse(localStorage.getItem("cartItem"));
        items.forEach(function (item) {
            if(item['id'] === productId){
                if(item['quantity'] > 1){
                    item['quantity'] = item['quantity'] - 1;
                }else{
                    item['quantity'] = item['quantity'] - 1;
                    quantityZeroFlag = true;
                }
            }
        });

        if(quantityZeroFlag){
            items = items.filter((item) => item.id !== productId)
        }

        if(items.length === 0){
            localStorage.removeItem('cartItem');
        }else{
            localStorage.setItem("cartItem", JSON.stringify(items));
        }

        let tempProducts = [];
        let tempTotalPrice = 0;
        let tempProductList = [];
        let productListName = '';
        let productListQuantity = 0;
        let productListUnitPrice = 0;

        if(items.length !== 0){
            items.forEach(function (item) {
                productListName = item.name;
                productListQuantity = item.quantity;
                productListUnitPrice = item.price;
                tempProductList.push({name: productListName, quantity: productListQuantity, unitprice: productListUnitPrice})
                for(let i = 0; i<item['quantity']; i++){
                    backendCallByProductId(item['id']).then(data => {
                        if(data.error){
                            // Error
                        }else{
                            
                            tempProducts.push(data);
                            tempTotalPrice = tempTotalPrice + data['price'];
                            setTotalPrice(tempTotalPrice);
                            setProducts(tempProducts);
                            setNoItemInCart(false);
                            setHistory({ ...history, ['totalprice']: tempTotalPrice });
                            setHistory({ ...history, ['productlist']: tempProductList, ['totalprice']: tempTotalPrice });
                        }
                    });
                }
            });
        }else{
            setProducts([]);
            setNoItemInCart(true);
            setTotalPrice(0);
            setHistory({ ...history, ['totalprice']: tempTotalPrice, ['productlist']: tempProductList });
        }
    };

    const orderPlaced = () => {
        return ( 
            <div className="alert alert-success" style={{ display: (redirectFlag)? '' : 'none' }}>
                Order Placed
            </div>
        )
    }

    const noContentAlert = () => (
        <div className="alert alert-danger" style={{ display: (isBlank)? '' : 'none' }}>
            All fields should be filled.
        </div>
    )

    return(
        <div  style={{paddingBottom:"200px"}}>
            <NavBarUserPage />
            {orderPlaced()}
            {noContentAlert()}
            <div className="container">
            <div className="text-center">
                <h4 className="text-muted">Cart</h4>
                <ul className="list-group mb-3 ">
                    {products.map((product, id) => (
                    
                    <li key={id} className="list-group-item d-flex justify-content-between lh-condensed">
                    <div className="text-left" style={{marginLeft:"1px"}}>
                        <p className="my-0 text-left">{product.name}</p>
                        <button onClick={() => (addOne(product._id))} className="btn-xs btn-success" style={{ fontSize:"50%" }}>Add</button>
                        <button onClick={() => (removeOne(product._id))} className="btn-xs btn-danger" style={{ fontSize:"50%", marginLeft: "5px"}}>Remove</button>
                        <Link to={`/productbyid/${product._id}/show`}>
                        <button className="btn-xs btn-primary" style={{ fontSize:"50%", marginLeft: "5px"}}>Detail</
                        button>
                        </Link>
                    </div>
                    <strong>${product.price}</strong>
                    </li>

                    ))}
                    <li className="list-group-item d-flex justify-content-between">
                    <span style={{ fontSize:"125%" }}>Total Price</span>
                    <strong style={{ fontSize:"125%" }}>${totalPrice}</strong>
                    </li>
                </ul>
            </div>
            </div>
            <div>
            <hr></hr>
            </div>
            
            <div className="text-center">
            <h4 className="text-muted">Billing Address & Payment</h4>
            </div>

            <div className="container col-md-8 offset-md-2">
            <form>
                <div className="form-group">
                    <label>First name</label>
                    <input
                        onChange={inputHandler('firstname')}
                        className="form-control"
                        type="text"
                        placeholder="first name"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={firstname}
                    />
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input
                        onChange={inputHandler('lastname')}
                        className="form-control"
                        type="text"
                        placeholder="last name"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={lastname}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        onChange={inputHandler('email')}
                        className="form-control"
                        type="text"
                        placeholder="xyz@example.com"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        onChange={inputHandler('address')}
                        className="form-control"
                        type="text"
                        placeholder="address"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={address}
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input
                        onChange={inputHandler('country')}
                        className="form-control"
                        type="text"
                        placeholder="country"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={country}
                    />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input
                        onChange={inputHandler('state')}
                        className="form-control"
                        type="text"
                        placeholder="state"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={state}
                    />
                </div>
                <div className="form-group">
                    <label>Zipcode</label>
                    <input
                        onChange={inputHandler('zip')}
                        className="form-control"
                        type="text"
                        placeholder="zip"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={zip}
                    />
                </div>
                <hr></hr>
                <div className="text-center">
                    <h4 className="text-muted">Payment Detail</h4>
                </div>
                <div className="form-group">
                    <label>Name on Card</label>
                    <input
                        onChange={inputHandlerCard('nameOnCard')}
                        className="form-control"
                        type="text"
                        placeholder=""
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={nameOnCard}
                    />
                </div>
                <div className="form-group">
                    <label>Card Number</label>
                    <input
                        onChange={inputHandlerCard('cardNumber')}
                        className="form-control"
                        type="text"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={cardNumber}
                    />
                </div>
                <div className="form-group">
                    <label>Expiration</label>
                    <input
                        onChange={inputHandlerCard('expirationDate')}
                        className="form-control"
                        type="text"
                        placeholder="mm/yyyy"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={expirationDate}
                    />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        onChange={inputHandlerCard('cvv')}
                        className="form-control"
                        type="text"
                        placeholder="xxx"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={cvv}
                    />
                </div>
                <hr></hr>
                <div className="form-group">
                    <button onClick={clickHandler} type="submit" className="btn btn-primary btn-lg btn-block">Checkout</button>
                </div>
            </form>
            </div>
            {orderPlaced()}
            {noContentAlert()}
        </div>
    )
}

export default CartPage;