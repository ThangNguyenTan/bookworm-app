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
        return returnedList = sortBooksByCategories(returnedList, searchedCategories);
    }

    if (searchedAuthors.length > 0) {
        return returnedList = sortBooksByAuthors(returnedList, searchedAuthors);
    }

    if (searchedRating > 0) {
        return returnedList = sortBooksByRatings(returnedList, searchedRating);
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
                (a, b) => parseFloat(a.book_price) - parseFloat(b.book_price)
            );
            break;
        case "pricedesc":
            returnedList = list.sort(
                (a, b) => parseFloat(b.book_price) - parseFloat(a.book_price)
            );
            break;
        default:
            break;
    }

    return returnedList;
};
