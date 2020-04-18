const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const LocalStrategy = require("passport-local");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require('./Models/user');
const path = require("path")
var cors = require('cors');

require('dotenv').config();

// database
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce",
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to database!'));

// Routes
const signupRoute = require('./Routes/signup');
const signinRoute = require('./Routes/signin');
const signoutRoute = require('./Routes/signout');
const testRoute = require('./Routes/test');
const addProductRoute = require('./Routes/addproduct');
const showProductRoute = require('./Routes/showproduct');
const adminSignUpRoute = require('./Routes/adminsignup');
const historyRoute = require("./Routes/addhistory");
const getImageRoute = require("./Routes/getimage");
const getProductByIdRoute = require("./Routes/showproductbyid");
const updateProductRoute = require("./Routes/updateproduct");
const showHistoryRoute = require("./Routes/showhistory");
const showProductByKeywordRoute = require("./Routes/showproductbykeyword");
const getHistoryRoute = require("./Routes/gethistory");
const getOrderNumberMaxRoute = require("./Routes/getOrderNumberMax");
const updateProductUserRoute = require("./Routes/updateproductuser");
const addToCartRoute = require("./Routes/addcart");
const removeFromCartRoute = require("./Routes/removeitemfromcart")
const getCartByIdRoute = require("./Routes/getcartbyid")

// express app
const app = express();


app.use(require("express-session")({
    secret: "itachi",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/server', signupRoute);
app.use('/server', signinRoute);
app.use('/server', signoutRoute);
app.use('/server', testRoute);
app.use('/server', addProductRoute);
app.use('/server', showProductRoute)
app.use('/server', adminSignUpRoute);
app.use('/server', historyRoute);
app.use('/server', getImageRoute);
app.use('/server', getProductByIdRoute);
app.use('/server', updateProductRoute);
app.use('/server', showHistoryRoute);
app.use('/server', showProductByKeywordRoute);
app.use('/server', getHistoryRoute);
app.use('/server', getOrderNumberMaxRoute);
app.use('/server', updateProductUserRoute);
app.use('/server', addToCartRoute);
app.use('/server', removeFromCartRoute);
app.use('/server', getCartByIdRoute);

// heroku
app.use(express.static(path.join(__dirname, "client", "build")))

// heroku
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// port
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});