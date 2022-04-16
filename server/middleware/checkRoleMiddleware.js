const jwt = require('jsonwebtoken');

module.exports = (role) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next();
        };
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'user is unauthorized' });
            };
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== role) {
                res.status(401).json({ message: 'You haven\'t rights for such resource' });
            };
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({ message: 'user is unauthorized' });
        };
    };
};
