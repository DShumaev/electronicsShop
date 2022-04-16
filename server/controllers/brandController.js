const { DeviceBrandModel } = require('../models/allModels');

class BrandController {
    async create(req, res) {
        const type = await DeviceBrandModel.create({name: req.body.name});
        return res.status(200).json(type);
    };

    async getAll(req, res) {
        const types = await DeviceBrandModel.findAll();
        return res.status(200).json(types);
    };
};

module.exports = new BrandController();
