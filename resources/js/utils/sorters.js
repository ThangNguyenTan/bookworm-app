export const sortReviews = (list, searchObject) => {
    const { searchedRating } = searchObject;
    let returnedList = list;

    if (searchedRating === 0) {
        return returnedList;
    }

    if (searchedRating) {
        returnedList = returnedList.filter((returnedListItem) => {
            return returnedListItem.rating_start == searchedRating;
        });
    }

    return returnedList;
};

export const sortReviewsOrderBy = (list, orderBy) => {
    let returnedList = list;

    switch (orderBy) {
        case "dateasc":
            returnedList = list.sort((a, b) => {
                let dateA = new Date(a.review_date).getTime();
                let dateB = new Date(b.review_date).getTime();
                return dateA > dateB ? 1 : -1;
            });
            break;
        case "datedesc":
            returnedList = list.sort((a, b) => {
                let dateA = new Date(a.review_date).getTime();
                let dateB = new Date(b.review_date).getTime();
                return dateA < dateB ? 1 : -1;
            });
            break;
        default:
            break;
    }

    return returnedList;
};
