import {
    ADD_TO_CART,
    CHANGE_CART_QUANTITY,
    CLEAR_CART,
    REMOVE_FROM_CART,
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = {
      cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const a = Number(action.payload.book.price) *
        Number(action.payload.quantity);
        return {
          ...state,
          cart: [
            {
              bookID: action.payload.book._id,
              image_url: action.payload.book.image_url,
              name: action.payload.book.name,
              author: action.payload.book.author,
              price: action.payload.book.price,
              quantity: action.payload.quantity,
              sub_total: parseFloat(a.toFixed(2)),
            },
            ...state.cart,
          ],
        };
      case REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter((cartItem) => {
            return cartItem.bookID !== action.payload.bookID;
          }),
        };
      case CHANGE_CART_QUANTITY:
        return {
          ...state,
          cart: state.cart.map((cartItem) => {
            if (cartItem.bookID === action.payload.bookID) {
              const b = Number(cartItem.price) * Number(action.payload.quantity);
              return {
                ...cartItem,
                quantity: action.payload.quantity,
                sub_total: parseFloat(b.toFixed(2)),
              };
            }
            return cartItem;
          }),
        };
      case CLEAR_CART:
        return {
          ...state,
          cart: [],
        };
      default:
        return state;
    }
  };
  