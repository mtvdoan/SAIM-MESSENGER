const jwt = require("jsonwebtoken");
const secret = "secret";
module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    console.log(req.cookies.usertoken);
    console.log({ secret });
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
};
