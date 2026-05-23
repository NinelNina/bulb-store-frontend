/*
import { Dispatch } from 'redux';
import { api } from '../services/api';
import {
    FETCH_PREORDERS_SUCCESS,
    FETCH_PREORDER_STATUSES_SUCCESS,
    FETCH_REVIEWS_SUCCESS
} from './actionTypes';

export const fetchPreorders = (params?: Record<string, any>) => async (dispatch: Dispatch) => {
    try {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key]) queryParams.append(key, params[key]);
            });
        }
        const response = await api.get<any[]>(`/orders/preorders?${queryParams.toString()}`);
        dispatch({ type: FETCH_PREORDERS_SUCCESS, payload: response });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchPreorderStatuses = () => async (dispatch: Dispatch) => {
    try {
        const response = await api.get<any[]>('/orders/preorders/statuses');
        dispatch({ type: FETCH_PREORDER_STATUSES_SUCCESS, payload: response });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updatePreorderStatus = (id: string, statusId: number) => async () => {
    try {
        return await api.patch(`/orders/preorders/${id}/status`, { statusId });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchProductReviews = (productId: string) => async (dispatch: Dispatch) => {
    try {
        const response = await api.get<any[]>(`/catalog/reviews/products/${productId}`);
        dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteReview = (reviewId: string) => async () => {
    try {
        return await api.delete(`/catalog/reviews/${reviewId}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
*/
