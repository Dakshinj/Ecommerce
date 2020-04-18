
exports.isAdmin = (req, res, next) => {
    if(req.session.userAdmin == 1){
        return next();
    }
    res.status(403).json({
        error: "Access Denied.(Admin)"
    });
}