import { $host, $authHost } from './index';

export const createType = async (type) => {
    const response = await $authHost.post(
        'api/type',
        type
    );

    return response.data;
};

export const fetchTypes = async () => {
    const response = await $host.get('api/type');

    return response.data;
};

export const createBrand = async (type) => {
    const response = await $authHost.post(
        'api/brand',
        type
    );

    return response.data;
};

export const fetchBrands = async () => {
    const response = await $host.get('api/brand');

    return response.data;
};

export const createDevice = async (device) => {
    const response = await $authHost.post(
        'api/device',
        device
    );

    return response.data;
};

export const fetchDevice = async (typeId, brandId, page, limit) => {
    const response = await $host.get('api/device', {
        params: {
            page,
            limit,
            deviceTypeId: typeId,
            deviceBrandId: brandId,
        }
    });

    return response.data;
};

export const fetchOneDevice = async (id) => {
    const response = await $host.get('api/device/' + id);

    return response.data;
};
