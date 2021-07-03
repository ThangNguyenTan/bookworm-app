import {
    GET_ALL_CATEGORIES_FAIL,
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
} from "../constants/categoryConstants";

export const categoryListReducer = (
    state = {
        categories: [],
        loading: true,
    },
    action
) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.sort((a, b) =>
                    a.category_name.localeCompare(b.category_name)
                ),
            };
        case GET_ALL_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
