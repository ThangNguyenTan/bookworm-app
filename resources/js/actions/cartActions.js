import { ADD_TO_CART, CHANGE_CART_QUANTITY, CLEAR_CART, REMOVE_FROM_CART } from "../constants/cartConstants"

export const addToCart = (book, quantity) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_TO_CART,
            payload: { book, quantity }
        })
        const { cartReducer } = getState();
        const { cart } = cartReducer;
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}

export const removeFromCart = (bookID) => {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: {bookID}
        })
        const { cartReducer } = getState();
        const { cart } = cartReducer;
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}

export const changeQuantity = (bookID, quantity) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_CART_QUANTITY,
            payload: {bookID, quantity}
        })
        const { cartReducer } = getState();
        const { cart } = cartReducer;
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}

export const clearCart = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_CART,
        })
        localStorage.removeItem("cart")
    }
}