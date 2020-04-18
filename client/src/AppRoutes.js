import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import AddProductPage from "./Pages/AddProductPage";
import SignOut from "./Pages/SignOut";
import AddAdmin from "./Pages/AddAdmin";
import PurchaseHistory from "./Pages/PurchaseHistory";
import ProductsPage from "./Pages/ProductsPage";
import ProductByIdPage from "./Pages/ProductByIdPage";
import CartPage from "./Pages/CartPage";
import UpdateProductPage from "./Pages/UpdateProductPage";
import CheckOut from "./Pages/CheckOut";

function AppRoutes() {
  return (
    <BrowserRouter>
            <Switch>
            <Route path="/" exact component={SignIn} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/addproducts" exact component={AddProductPage} />
                <Route path="/signout" exact component={SignOut} />
                <Route path="/addadmin" exact component={AddAdmin} />
                <Route path="/purchasehistory" exact component={PurchaseHistory} />
                <Route path="/products" exact component={ProductsPage} />
                <Route path="/productbyid/:id/show" exact component={ProductByIdPage} />
                <Route path="/cart" exact component={CartPage} />
                <Route path="/updateproduct" exact component={UpdateProductPage} />
                <Route path="/checkout" exact component={CheckOut} />
            </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
