import React, {useState, useEffect} from 'react';
import NavBarAdminPage from "../Components/NavBarAdminPage"
import { Redirect } from "react-router-dom";
import { isAdmin } from "../Helper/isAdmin";

const AddProductPage = () => {
    
    const [product, setProduct] = useState({
        name: '',
        price: '',
        available: '',
        description: '',
        image: '',
        formData: '',
        msg: '',
        flag: false
    });
    const [isBlank, setIsBlank] = useState(false);

    const { name, price, available, description, formData, msg, flag } = product;

    useEffect(() => {
        setProduct({...product, formData: new FormData()});
    },[])
    
    const inputHandler = value => event => {
        if(value === 'image'){
            formData.set(value, event.target.files[0]);
            setProduct({ ...product, [value]: event.target.files[0] });
        }else{
            formData.set(value, event.target.value);
            setProduct({ ...product, [value]: event.target.value });
        }
    };

    const backendCall = value => {
        return fetch("/server/addproduct", {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: value
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
    }

    const clickHandler = (event) =>{
        event.preventDefault();
        if(product.name.length === 0 || product.price.length === 0 || product.available.length === 0 || product.description.length === 0 || product.image.length === 0){
            setIsBlank(true);
            setProduct({ ...product, flag:false, msg: ''});
        }else{
            setIsBlank(false);
            backendCall(formData).then(data => {
                //console.log(data.error);
                if(data.error){
                    setProduct({ ...product, flag:true, msg: data.error});
                }else{
                    setProduct({
                        ...product,
                        name: '',
                        price: '',
                        available: '',
                        description: '',
                        msg: '',
                        image: '',
                        flag: false
                    });
                }
            });
        }
    };

    const noContentAlert = () => (
        <div className="alert alert-danger" style={{ display: (isBlank)? '' : 'none' }}>
            All fields should be filled.
        </div>
    )

    const form = () => (
        <div className="jumbotron col-md-8 offset-md-2">
            <h1 className="display-10 text-center">Add Products</h1>
            <hr></hr>
            <div className="container col-md-8 offset-md-2">
            <form>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        onChange={inputHandler('name')}
                        className="form-control"
                        type="text"
                        placeholder="name"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={name}
                    />
                </div>
                <div className="form-group">
                <label>Price</label>
                    <input
                        onChange={inputHandler('price')}
                        className="form-control"
                        type="number"
                        placeholder="price"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={price}
                    />
                </div>
                <div className="form-group">
                <label>Quantity</label>
                    <input
                        onChange={inputHandler('available')}
                        className="form-control"
                        type="number"
                        placeholder="available"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={available}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        onChange={inputHandler('description')} className="form-control"
                        value={description}
                    />
                </div>
                <div className="form-group">
                    <label>Product image </label>
                    <input onChange={inputHandler('image')} type="file" name="image" accept="image/*" />
                </div>
                <div className="form-group">
                    <button onClick={clickHandler} type="submit" className="btn btn-primary btn-lg btn-block">Upload</button>
                </div>
            </form>
            </div>
        </div>
    );

    const alert = () => {
        if(flag){
            return(
            <div className="alert alert-danger" style={{ display: (msg!=='')? '' : 'none' }}>
                {msg}
            </div>);
        }
    };
    
    return (
        <div>
            <NavBarAdminPage />
            <div className="container" style={{paddingTop:"5%"}}>
                {alert()}
                {noContentAlert()}
                {form()}
            </div>
        </div>
    );
}

export default AddProductPage;