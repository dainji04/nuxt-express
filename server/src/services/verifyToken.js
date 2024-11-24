const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] || req.headers['x-access-token'];
    const checkBearer = 'Bearer ';

    if (token) {
        if (token.startsWith(checkBearer)) {
            token = token.slice(checkBearer.length, token.length);
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('wrong token!');

                return res.json({
                    success: false,
                    message: 'failed to authenticate token',
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({ success: false, message: 'no token provided' });
    }
};

module.exports = verifyToken;
