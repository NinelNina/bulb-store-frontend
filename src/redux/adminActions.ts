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
        if (params[key] !== undefined && params[key] !== null) queryParams.append(key, params[key]);
      });
    }
    const response = await api.get<any[]>(`/preorders?${queryParams.toString()}`);
    console.log("Preorders fetch response:", response);
    dispatch({ type: FETCH_PREORDERS_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPreorderStatuses = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get<any[]>('/preorders/statuses');
    dispatch({ type: FETCH_PREORDER_STATUSES_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePreorderStatus = (id: string, statusId: number) => async () => {
  try {
    return await api.patch(`/preorders/${id}/status`, { preorderStateId: statusId });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProductReviews = (productId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await api.get<any[]>(`/reviews/products/${productId}`);
    dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReview = (reviewId: string) => async () => {
  try {
    return await api.delete(`/reviews/${reviewId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
