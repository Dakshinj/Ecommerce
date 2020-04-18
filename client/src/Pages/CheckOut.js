import React, {useState, useEffect} from 'react';
import NavBarUserPage from "../Components/NavBarUserPage"
import { Redirect } from "react-router-dom";
import { isAdmin } from "../Helper/isAdmin";
import { Link } from 'react-router-dom';

const CheckOut = () => {
    
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({
        firstname:'',
        lastname:'',
        email:'',
        address:'',
        country:'',
        state:'',
        zip:''
    });

    useEffect(() => {
        
        if(localStorage.getItem("cartItem") !== null){
            let items = JSON.parse(localStorage.getItem("cartItem"));
            setProducts(items);
        }
        
        let tempFirstName;
        if(localStorage.getItem("firstname") !== null){
            tempFirstName = JSON.parse(localStorage.getItem("firstname"));
        }

        let tempLastName;
        if(localStorage.getItem("lastname") !== null){
            tempLastName = JSON.parse(localStorage.getItem("lastname"));
        }

        let tempEmail;
        if(localStorage.getItem("email") !== null){
            tempEmail = JSON.parse(localStorage.getItem("email"));
        }

        let tempAddress;
        if(localStorage.getItem("address") !== null){
            tempAddress = JSON.parse(localStorage.getItem("address"));
        }

        let tempCountry;
        if(localStorage.getItem("country") !== null){
            tempCountry = JSON.parse(localStorage.getItem("country"));
        }

        let tempState;
        if(localStorage.getItem("state") !== null){
            tempState = JSON.parse(localStorage.getItem("state"));
        }

        let tempZip;
        if(localStorage.getItem("zip") !== null){
            tempZip = JSON.parse(localStorage.getItem("zip"));
        }

        setUser({ ...user,
             ["firstname"] : tempFirstName,
             ["lastname"]: tempLastName,
             ["email"]: tempEmail,
             ["address"]: tempAddress,
             ["country"]: tempCountry,
             ["state"]: tempState,
             ["zip"]: tempZip
        });
        
        localStorage.removeItem('cartItem');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        localStorage.removeItem('address');
        localStorage.removeItem('country');
        localStorage.removeItem('state');
        localStorage.removeItem('zip');

    },[]);

    return (
        <div>
            <NavBarUserPage />
                <div className="container" style={{paddingBottom: "40px"}}>
                <div className="text-center" style={{paddingBottom: "10px"}}>
                <h4 className="text-muted">Order Summary</h4>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12" style={{paddingBottom: "1px"}}>
                    <div className = "container" style={{paddingBottom: "15px"}}>
                    <div className = "row border" style={{height: "100%x"}}>
                    <div className="col-4" style={{margin: "auto", paddingTop:"10px", paddingBottom:"10px"}}>
                        <strong>Full Name:</strong>
                    </div>
                    <div className="col-8" style={{margin: "auto", paddingTop:"10px", paddingBottom:"10px"}}>
                        {user.firstname} {user.lastname}
                    </div>
                    <div className="col-4" style={{margin: "auto", paddingTop:"0px", paddingBottom:"10px"}}>
                        <strong>Email:</strong>
                    </div>
                    <div className="col-8" style={{margin: "auto", paddingTop:"10px", paddingBottom:"10px"}}>
                        {user.email}
                    </div>
                    <div className="col-4" style={{margin: "auto", paddingTop:"0px", paddingBottom:"10px"}}>
                        <strong>Address:</strong>
                    </div>
                    <div className="col-8" style={{margin: "auto", paddingTop:"10px", paddingBottom:"10px"}}>
                        {user.address}<br></br>
                        {user.country}<br></br>
                        {user.state} {user.zip}
                    </div>
                    </div>
                    </div>
                </div>
                <div className="row">
                {products.map((product, id) => (
                    <div key={id} className="col-lg-12 col-md-12 col-sm-12 col-12" style={{paddingBottom: "1px"}}>
                        <div className = "container">
                        <div className = "row border" style={{height: "100%x"}}>
                            <div className="col-8" style={{margin: "auto", paddingTop:"10px"}}>
                                <strong>{product.name}</strong>
                                <p>
                                    Unit price: ${product.price}
                                    <br></br>
                                    Quantity:{product.quantity}
                                </p>
                            </div>
                            <div className="col-4" style={{margin:"auto"}}>
                            <img 
                                src={`server/product/image/${product.id}`}
                                alt=""
                                style={{height:"125px", width:"95%"}}
                            >
                            </img>
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

export default CheckOut;