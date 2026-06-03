import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartReducer';
import { productReducer } from './productReducer';
import { orderReducer } from './orderReducer';
import { authReducer } from './authReducer';
import { adminReducer } from './adminReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    auth: authReducer,
    admin: adminReducer
  },
});

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
