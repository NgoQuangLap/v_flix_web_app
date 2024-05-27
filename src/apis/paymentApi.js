/* eslint-disable */
import { apiClient } from './SetupAxios';

const path = '/api/payment'

export const paymentList = async () => {
    const response = await apiClient.get(path);

    return response;
}

export const getPaymentById = async ({ id }) => {
    const response = await apiClient.get(`${path}/${id}`);

    return response;
}

export const paymentFilm = async ({ amount, customerId, filmId }) => {
    const promise = await apiClient.post(
        `${path}/create-checkout-session`,
        { amount, customerId, filmId },
    );
    return promise;
};

export const paymentBank = async ({ amount, customerId, filmId }) => {
    const promise = await apiClient.post(
        `${path}/payment-bank`,
        { amount, customerId, filmId },
    );
    return promise;
};

export const updateStatusPayment = async (id) => {
    const promise = await apiClient.patch(`${path}/${id}`);
    return promise;
  };