import {
    GET_ALL_AUTHORS_FAIL,
    GET_ALL_AUTHORS_REQUEST,
    GET_ALL_AUTHORS_SUCCESS,
} from "../constants/authorConstants";

export const authorListReducer = (
    state = {
        authors: [],
        loading: true,
    },
    action
) => {
    switch (action.type) {
        case GET_ALL_AUTHORS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ALL_AUTHORS_SUCCESS:
            return {
                ...state,
                loading: false,
                authors: action.payload.sort((a, b) =>
                    a.author_name.localeCompare(b.author_name)
                ),
            };
        case GET_ALL_AUTHORS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
