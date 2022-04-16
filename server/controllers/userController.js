const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const { UserModel, BasketModel } = require('../models/allModels');
const jwtCreator = require('../utils/jwtCreator');

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('password or email incorrect'));
        };
        const userIsExist = await UserModel.findOne({ where: {email} });
        if (userIsExist) {
            return next(ApiError.badRequest('user with such email has been created already'));
        };
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await UserModel.create({
            email,
            role,
            password: hashedPassword,
        });
        await BasketModel.create({ userId: user.id });
        res.status(200).json({ message: 'user created successfully'  })
    };

    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('password or email incorrect'));
        };
        const user = await UserModel.findOne({ where: {email} });
        if (!user) {
            return next(ApiError.badRequest('user with such email has\'t been created yet'));
        };
        const pswdIsValid = await bcrypt.compare(password, user.password);
        if (!pswdIsValid) {
            return next(ApiError.badRequest('password or email incorrect'));
        };
        const token = jwtCreator({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return res.status(200).json({ token });
    };

    async tokenUpdate(req, res, next) {
        const token = jwtCreator({
            userId: req.user.id,
            email: req.user.email,
            role: req.user.role,
        });
        return  res.status(200).json({token});
    };
};

module.exports = new UserController();
