import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_VALIDATE_SUCCESS
} from './actionTypes';

interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
}

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('admin_token'),
    user: localStorage.getItem('admin_token') ? { username: localStorage.getItem('admin_username') || 'admin' } : null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
        case AUTH_VALIDATE_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};
