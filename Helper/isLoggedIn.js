exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(400).json({
        error: "Access Denied"
    });
}