const jwt = require("jsonwebtoken");
const routerConfig = require('../Config/routes');

const loginPath = routerConfig.user.basePath + routerConfig.user.login
const authMiddleware = (req, res, next) => {
    const token = req.cookies.POKEMON_AUTH_TOKEN;
    if (!token) {
        res.send({
            hasError: true,
            message: "You are not logged in",
            redirect: loginPath
        })
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.send({
            hasError: true,
            message: "You are not logged in",
            redirect: loginPath
        })
    }
}

module.exports = authMiddleware;