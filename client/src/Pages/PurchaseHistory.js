import React, {useState, useEffect} from 'react';
import NavBarAdminPage from "../Components/NavBarAdminPage"
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

const PurchaseHistory = () => {

    const [histories, setHistories] = useState([]);

    const backendCall = () =>{
        return fetch("/server/gethistory", {
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
                //error
            }else{
                setHistories(data);
            }
        });
    },[]);
    
    return(
        
        <div>
            <NavBarAdminPage />
            <div className="container">
            <div className="accordion" id="accordionExample" style={{width:"100%"}}>
                {histories.map((history, id) => (
                
                <div key={id} className="card">
                    <div className="card-header" id="headingOne">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${id}`} aria-expanded="true" aria-controls="collapseOne">
                            <strong>Order # {history.ordernumber}</strong> - Value: ${history.totalprice} 
                        </button>
                    </div>
                    
                    <div id={`collapse${id}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body">
                        <div>
                            <strong>First name:</strong> {history.firstname}
                            <br></br>
                            <strong>Last name:</strong> {history.lastname}
                            <br></br>
                            <strong>Date Time:</strong> {history.purchaseDate}
                            <br></br>
                            <strong>Email:</strong> {history.email}
                            <br></br>
                            <strong>Address:</strong> {history.address}, {history.country}, {history.state} - {history.zip}
                            <br></br>
                            <strong>Total Price:</strong> ${history.totalprice}
                            <br></br>
                            <br></br>
                            <hr></hr>
                            {history.productlist.map((product, id) => (
                                <div key={id}>
                                    <strong>Product </strong> #{id}
                                    <br></br>
                                    <strong>Name: </strong> {product.name}
                                    <br></br>
                                    <strong>quantity: </strong> {product.quantity} Units
                                    <br></br>
                                    <strong>Unit price: </strong> ${product.unitprice}
                                    <br></br>
                                    <hr></hr>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </div>

                ))}
            </div>
            </div>
        </div>
    )
};

export default PurchaseHistory;