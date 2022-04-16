import { $host, $authHost } from './index';
import jwtDecode from 'jwt-decode';

export const registration = async (email, password) => {
    const response = await $host.post(
        'api/user/registration',
        {
            email,
            password,
            role: 'USER',
        });

    return response;
};

export const login = async (email, password) => {
    const response = await $host.post(
        'api/user/login',
        {
            email,
            password,
        });
    localStorage.setItem('token', response.data.token);

    return jwtDecode(response.data.token);  // {userId, email, role}
};

export const checkToken = async () => {
    const response = await $authHost.get('api/user/auth');
    localStorage.setItem('token', response.data.token);

    return jwtDecode(response.data.token);
};
