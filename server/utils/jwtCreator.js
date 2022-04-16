const jwt = require('jsonwebtoken');

module.exports = (payload) => {
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
            expiresIn: '24h',
        },
    );
};
