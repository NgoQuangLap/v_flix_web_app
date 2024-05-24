/* eslint-disable */
import { apiClient } from './SetupAxios';

export const paymentFilm = async ({ amount, customerId, filmId, nameFilm }) => {
    const promise = await apiClient.post(
        '/api/payment/create-checkout-session',
        { amount, customerId, filmId, nameFilm },
    );
    return promise;
};