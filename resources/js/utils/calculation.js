export const calculateTotalReviews = (reviewsStatus) => {
    let sum = 0;
    for (let i = 1; i <= 5; i++) {
        const element = reviewsStatus[`numberof${i}starreviews`];
        sum += parseInt(element);
    }
    return sum;
}


