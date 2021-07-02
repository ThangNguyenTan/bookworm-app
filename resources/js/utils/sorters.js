import { calculateDiscountPriceDiff } from "./calculation";

export const getBooksWithHighestSale = (bookList, numberOfBooks = 10) => {
    bookList = bookList.map(bookItem => {
        return {
            ...bookItem,
            discount_price_diff: calculateDiscountPriceDiff(bookItem)
        }
    });

    bookList = bookList.sort((a, b) => b.discount_price_diff - a.discount_price_diff)

    return bookList.slice(0, numberOfBooks);
}

export const getBooksWithHighestRatings = (bookList, numberOfBooks = 8) => {
    bookList = bookList.sort((a, b) => {
        if (a.ratings == b.ratings) {
            return a.discount_price - b.discount_price;
        }
        return b.ratings - a.ratings;
    })

    return bookList.slice(0, numberOfBooks);
}

export const getBooksWithHighestReviews = (bookList, numberOfBooks = 8) => {
    bookList = bookList.sort((a, b) => {
        if (a.reviews.length == b.reviews.length ) {
            return a.discount_price - b.discount_price;
        }
        return b.reviews.length  - a.reviews.length ;
    })

    return bookList.slice(0, numberOfBooks);
}

export const sortBooks = (list, searchObject) => {
    const { searchedCategories, searchedAuthors, searchedRating } =
        searchObject;
    let returnedList = list;

    if (searchedCategories) {
        returnedList = sortBooksByCategories(returnedList, searchedCategories);
    }

    if (searchedAuthors) {
        returnedList = sortBooksByAuthors(returnedList, searchedAuthors);
    }

    if (searchedRating) {
        returnedList = sortBooksByRatings(returnedList, searchedRating);
    }

    return returnedList;
};

export const sortBooksIndividually = (list, searchObject) => {
    const { searchedCategories, searchedAuthors, searchedRating } =
        searchObject;
    let returnedList = list;

    if (searchedCategories.length > 0) {
        return (returnedList = sortBooksByCategories(
            returnedList,
            searchedCategories
        ));
    }

    if (searchedAuthors.length > 0) {
        return (returnedList = sortBooksByAuthors(
            returnedList,
            searchedAuthors
        ));
    }

    if (searchedRating > 0) {
        return (returnedList = sortBooksByRatings(
            returnedList,
            searchedRating
        ));
    }

    return returnedList;
};

const sortBooksByCategories = (list, searchedCategories) => {
    let returnedList = [];

    if (searchedCategories.length === 0) {
        return list;
    }

    searchedCategories.forEach((sortGenre) => {
        list.forEach((item) => {
            if (item.category_id === sortGenre) {
                if (!returnedList.includes(item)) {
                    returnedList.push(item);
                }
            }
        });
    });

    return returnedList;
};

const sortBooksByAuthors = (list, searchedAuthors) => {
    let returnedList = [];

    if (searchedAuthors.length === 0) {
        return list;
    }

    searchedAuthors.forEach((sortGenre) => {
        list.forEach((item) => {
            console.log(item.author.id);
            if (item.author.id === sortGenre) {
                if (!returnedList.includes(item)) {
                    returnedList.push(item);
                }
            }
        });
    });

    return returnedList;
};

const sortBooksByRatings = (list, searchedRating) => {
    let returnedList = [];

    if (!searchedRating) {
        return list;
    }

    returnedList = list.filter((item) => {
        return item.ratings >= searchedRating;
    });

    return returnedList;
};

export const sortBooksOrderBy = (list, orderBy) => {
    let returnedList = list;

    switch (orderBy) {
        case "atoz":
            returnedList = list.sort((a, b) =>
                a.book_title.localeCompare(b.book_title)
            );
            break;
        case "ztoa":
            returnedList = list.sort((a, b) =>
                b.book_title.localeCompare(a.book_title)
            );
            break;
        /*
      case "ratingasc":
        returnedList = list.sort((a, b) => a.ratings - b.ratings);
        break;
      case "ratingdesc":
        returnedList = list.sort((a, b) => b.ratings - a.ratings);
        break;
        */
        case "priceasc":
            returnedList = list.sort(
                (a, b) => parseFloat(a.discount_price) - parseFloat(b.discount_price)
            );
            break;
        case "pricedesc":
            returnedList = list.sort(
                (a, b) => parseFloat(b.discount_price) - parseFloat(a.discount_price)
            );
            break;
        default:
            break;
    }

    return returnedList;
};

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
