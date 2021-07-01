import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authorListReducer } from "../reducers/authorReducer";
import { bookDetailsReducer, bookListReducer } from "../reducers/bookReducers";
import { cartReducer } from "../reducers/cartReducers";
import { categoryListReducer } from "../reducers/categoryReducers";

const initialState = {};

const reducer = combineReducers({
    bookListReducer,
    cartReducer,
    authorListReducer,
    categoryListReducer,
    bookDetailsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
