import { authorListReducer } from "./authorReducer";
import {
    bookDetailsReducer,
    bookListReducer,
    recBookListReducer,
} from "./bookReducers";
import { cartReducer } from "./cartReducers";
import { categoryListReducer } from "./categoryReducers";
import {
    orderActionReducer,
    orderDetailsReducer,
    orderListReducer,
} from "./orderReducer";
import {
    reviewActionReducer,
    reviewListReducer,
    reviewSearchObjectReducer,
} from "./reviewReducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    bookListReducer,
    cartReducer,
    authorListReducer,
    categoryListReducer,
    bookDetailsReducer,
    reviewActionReducer,
    reviewListReducer,
    orderActionReducer,
    orderDetailsReducer,
    orderListReducer,
    recBookListReducer,
    reviewSearchObjectReducer,
});
