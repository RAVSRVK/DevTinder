const adminMiddleware = (req, res, next) => {
    const isAdmin = true
    isAdmin ? next() : res.status(403).send("Access denied. Admins only.");
};

module.exports = {adminMiddleware}