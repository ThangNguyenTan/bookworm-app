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
        const a = parseFloat(action.payload.book.book_price) *
        parseFloat(action.payload.quantity);
        return {
          ...state,
          cart: [
            {
              book_title: action.payload.book.book_title,
              book_price: action.payload.book.book_price,
              book_cover_photo: action.payload.book.book_cover_photo,
              author: action.payload.book.author,
              bookID: action.payload.book.id,
              sub_total: parseFloat(a.toFixed(2)),
              quantity: Number(action.payload.quantity),
              book_og_price: action.payload.book.book_og_price
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
              const b = parseFloat(cartItem.book_price) * parseFloat(action.payload.quantity);
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
        localStorage.removeItem("cart");
        return {
          ...state,
          cart: [],
        };
      default:
        return state;
    }
  };
  