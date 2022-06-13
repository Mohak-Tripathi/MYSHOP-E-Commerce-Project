import { CART_ADD_ITEM } from "../constants/cartConstant.js";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItems = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (existItems) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => {
            return x.product === item.product ? item : x;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
