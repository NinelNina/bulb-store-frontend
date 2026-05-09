import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART } from './actionTypes';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

export const cartReducer = (state = initialState, action: any): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case REMOVE_FROM_CART:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((item) => item.id !== id) };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }
    case CLEAR_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};
