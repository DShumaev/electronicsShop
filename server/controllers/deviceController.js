const { DeviceModel, DeviceInfoModel } = require('../models/allModels');
const ApiError = require('../error/apiError');
const uuid = require('uuid');
const path = require('path');

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, deviceBrandId, deviceTypeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + '.jpg';
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await DeviceModel.create({
                name,
                price,
                deviceBrandId,
                deviceTypeId,
                img: fileName
            });
            let infoCurrent = info;

            if (infoCurrent) {
                infoCurrent = JSON.parse(infoCurrent);
                infoCurrent.forEach((infoItem) => {
                    DeviceInfoModel.create({
                        title: infoItem.title,
                        description: infoItem.description,
                        deviceId: device.id,
                    });
                });
            };

            return res.status(200).json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        };
    };

    async getAll(req, res) {
        const { deviceBrandId, deviceTypeId, limit, page } = req.query;
        let pageCurrent = page || 1;
        let limitCurrent = limit || 10;
        let offsetCurrent = pageCurrent * limitCurrent - limitCurrent;
        let devices;
        if (!deviceBrandId && !deviceTypeId) {
            devices = await DeviceModel.findAndCountAll({
                limit: limitCurrent,
                offset: offsetCurrent,
            });
        };
        if (deviceBrandId && !deviceTypeId) {
            devices = await DeviceModel.findAndCountAll({
                where: { deviceBrandId },
                limit: limitCurrent,
                offset: offsetCurrent,
            });
        };
        if (!deviceBrandId && deviceTypeId) {
            devices = await DeviceModel.findAndCountAll({
                where: { deviceTypeId },
                limit: limitCurrent,
                offset: offsetCurrent,
            });

        };
        if (deviceBrandId && deviceTypeId) {
            devices = await DeviceModel.findAndCountAll({
                where: {
                    deviceBrandId,
                    deviceTypeId
                },
                limit: limitCurrent,
                offset: offsetCurrent,
            });
        };
        return res.status(200).json(devices);
    };

    async getOne(req, res, next) {
        const { id } = req.params;
        if (!id) {
            next(ApiError.badRequest('param of query doesn\'t contain ID'));
        };
        const device = await DeviceModel.findOne({
            where: { id },
            include: [{
                model: DeviceInfoModel,
                as: 'info',
            }],
        });

        return res.status(200).json(device);
    };
};

module.exports = new DeviceController();
