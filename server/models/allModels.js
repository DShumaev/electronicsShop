const Basket = require('./basket');
const BasketProduct = require('./basketProduct');
const Device = require('./device');
const DeviceBrand = require('./deviceBrand');
const DeviceInfo = require('./deviceInfo');
const DeviceRating = require('./deviceRating');
const DeviceType = require('./deviceType');
const User = require('./user');
const TypeBrand = require('./deviceTypeBrand');

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(DeviceRating);
DeviceRating.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

DeviceType.hasMany(Device);
Device.belongsTo(DeviceType);

DeviceBrand.hasMany(Device);
Device.belongsTo(DeviceBrand);

Device.hasMany(DeviceRating);
DeviceRating.belongsTo(Device);

Device.hasMany(BasketProduct);
BasketProduct.belongsTo(Device);

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device);

DeviceType.belongsToMany(DeviceBrand, {through: TypeBrand});
DeviceBrand.belongsToMany(DeviceType, {through: TypeBrand});

module.exports = {
    UserModel: User,
    BasketModel: Basket,
    BasketProductModel: BasketProduct,
    DeviceModel: Device,
    DeviceTypeModel: DeviceType,
    DeviceBrandModel: DeviceBrand,
    DeviceRatingModel: DeviceRating,
    DeviceInfoModel: DeviceInfo
};
