const jwt = require("jsonwebtoken");
const routerConfig = require('../Config/routes');


const authMiddleware = (req, res, next) => {
    const token = req.cookies.POKEMON_AUTH_TOKEN;
    if (!token) {
        res.redirect(routerConfig.user.basePath + routerConfig.user.login);
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.redirect(routerConfig.user.basePath + routerConfig.user.login);
    }
}

module.exports = authMiddleware;