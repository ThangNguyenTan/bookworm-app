import React from "react";
import moment from "moment";

function ReviewItem({ reviewItem }) {
    const { review_title, review_details, review_date, rating_start } =
        reviewItem;

    return (
        <div className="review-item">
            <div className="review-item__header">
                <h4>{review_title}</h4>
                <div className="mx-2">|</div>
                <p>{rating_start} star(s)</p>
            </div>
            <div className="review-item__body">
                <p>
                    {review_details || (
                        <i>There is no details for this review</i>
                    )}
                </p>
            </div>
            <div className="review-item__footer">
                <h6>
                    {moment(new Date(review_date).getTime()).format(
                        "MMMM Do, YYYY"
                    )}
                </h6>
            </div>
        </div>
    );
}

export default ReviewItem;
