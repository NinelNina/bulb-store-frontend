import { Dispatch } from 'redux';
import { api } from '../services/api';
import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_VALIDATE_SUCCESS
} from './actionTypes';

export const login = (credentials: any) => async (dispatch: Dispatch) => {
  try {
    const response = await api.post<any>('/auth/login', credentials);
    const token = response.token || 'placeholder_token';
    const user = response.user || { username: credentials.username || 'admin' };
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_username', user.username || user.name || credentials.username || 'admin');
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: user });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await api.post('/auth/logout', {});
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    dispatch({ type: AUTH_LOGOUT });
  } catch (error) {
    console.error(error);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    dispatch({ type: AUTH_LOGOUT });
  }
};

export const validateToken = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem('admin_token');
  if (!token) return;

  try {
    const response = await api.post<any>('/auth/validate', { token });
    const storedUsername = localStorage.getItem('admin_username') || 'admin';
    const user = response.user || (response.username || response.name ? response : null) || { username: storedUsername };
    dispatch({ type: AUTH_VALIDATE_SUCCESS, payload: user });
  } catch (error) {
    console.error(error);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    dispatch({ type: AUTH_LOGOUT });
  }
};

export const registerAdmin = (userData: any) => async () => {
  try {
    const response = await api.post<any>('/auth/register', userData);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
