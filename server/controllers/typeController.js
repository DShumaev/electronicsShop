const { DeviceTypeModel } = require('../models/allModels');

class TypeController {
    async create(req, res) {
        const type = await DeviceTypeModel.create({ name: req.body.name });
        return res.status(200).json(type);
    };

    async getAll(req, res) {
        const types = await DeviceTypeModel.findAll();
        return res.status(200).json(types);
    };
};

module.exports = new TypeController();
