export const toRating = (num) => {
    return num.toFixed(1);
};

export const calculateRatings = (reviews) => {
    let numberOf1StarReviews = [],
        numberOf2StarReviews = [],
        numberOf3StarReviews = [],
        numberOf4StarReviews = [],
        numberOf5StarReviews = [];

    reviews.forEach((review) => {
        switch (review.rating_start) {
            case "1":
                numberOf1StarReviews.push(review);
                break;
            case "2":
                numberOf2StarReviews.push(review);
                break;
            case "3":
                numberOf3StarReviews.push(review);
                break;
            case "4":
                numberOf4StarReviews.push(review);
                break;
            case "5":
                numberOf5StarReviews.push(review);
                break;
            default:
                break;
        }
    });

    let a = numberOf1StarReviews.length;
    let b = numberOf2StarReviews.length;
    let c = numberOf3StarReviews.length;
    let d = numberOf4StarReviews.length;
    let e = numberOf5StarReviews.length;
    let ratings = toRating(
        (1 * a + 2 * b + 3 * c + 4 * d + 5 * e) / (a + b + c + d + e)
    );
    ratings = isNaN(ratings) ? 0 : ratings;

    return {
        numberOfReviews: [0, a, b, c, d, e],
        ratings,
    };
};

export const calculateDiscountPrice = (book) => {
    const { discounts, book_price } = book;
    let finalPrice = book_price;

    let sortedDiscounts = discounts.filter((discount) => {
        const { discount_start_date, discount_end_date } = discount;

        return (
            new Date(discount_start_date).getTime() >= new Date().getTime() &&
                (!discount_end_date ||
            new Date(discount_end_date).getTime() < new Date().getTime())
        );
    });

    if (sortedDiscounts.length > 0) {
        if (sortedDiscounts.length > 1) {
            sortedDiscounts.sort((a, b) => a.discount_price - b.discount_price);
        }

        finalPrice = sortedDiscounts[0].discount_price;
    }

    return finalPrice;
};

export const calculateDiscountPriceDiff = (book) => {
    const { discounts, book_price } = book;
    let finalPrice = 0;

    let sortedDiscounts = discounts.filter((discount) => {
        const { discount_start_date, discount_end_date } = discount;

        return (
            new Date(discount_start_date).getTime() >= new Date().getTime() &&
                (!discount_end_date ||
            new Date(discount_end_date).getTime() < new Date().getTime())
        );
    });

    if (sortedDiscounts.length > 0) {
        if (sortedDiscounts.length > 1) {
            sortedDiscounts.sort((a, b) => a.discount_price - b.discount_price);
        }

        finalPrice = parseFloat(book_price) - parseFloat(sortedDiscounts[0].discount_price);
    }

    return finalPrice;
};
