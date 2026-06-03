import {
  FETCH_PREORDERS_SUCCESS,
  FETCH_PREORDER_STATUSES_SUCCESS,
  FETCH_REVIEWS_SUCCESS
} from './actionTypes';

interface AdminState {
  preorders: any[];
  preorderStatuses: any[];
  reviews: any[];
}

const initialState: AdminState = {
  preorders: [],
  preorderStatuses: [],
  reviews: [],
};

export const adminReducer = (state = initialState, action: any): AdminState => {
  switch (action.type) {
    case FETCH_PREORDERS_SUCCESS:
      return { ...state, preorders: Array.isArray(action.payload) ? action.payload : (action.payload?.items || action.payload?.data || []) };
    case FETCH_PREORDER_STATUSES_SUCCESS:
      return { ...state, preorderStatuses: Array.isArray(action.payload) ? action.payload : (action.payload?.items || action.payload?.data || []) };
    case FETCH_REVIEWS_SUCCESS:
      return { ...state, reviews: Array.isArray(action.payload) ? action.payload : (action.payload?.items || action.payload?.data || []) };
    default:
      return state;
  }
};
