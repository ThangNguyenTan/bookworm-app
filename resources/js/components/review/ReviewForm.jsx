import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../actions/reviewActions";
import data from "../../data";
import ErrorBox from "../Partials/ErrorBox";
//import LoadingBox from "../partials/LoadingBox";

function ReviewForm({ bookID }) {
    const dispatch = useDispatch();

    const reviewActionReducer = useSelector(
        (state) => state.reviewActionReducer
    );
    const { loading, error } = reviewActionReducer;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [star, setStar] = useState(1);

    const renderStarOptions = () => {
        return data.reviewCriterias.map((reviewCriteria) => {
            return (
                <option value={reviewCriteria.value} key={reviewCriteria.id}>
                    {reviewCriteria.name}
                </option>
            );
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bookID);
        dispatch(
            addReview({
                book_id: bookID,
                review_title: title,
                review_details: description,
                rating_start: star,
            })
        );

        setTitle("");
        setDescription("");
        setStar(1);
    };

    if (error) {
        return <ErrorBox message={error} />;
    }

    const renderSubmitReviewButton = () => {
        if (loading) {
            return (
                <button type="button" className="button dark block">
                    Loading...
                </button>
            );
        }

        return (
            <button type="submit" className="button dark block">
                Submit Review
            </button>
        );
    };

    return (
        <div id="review-form">
            <Card>
                <Card.Header>
                    <h2>Write a Review</h2>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="title">Add a title</Form.Label>
                            <Form.Control
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                maxLength={120}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="desc">
                                Details please! Your review helps other
                                shoppers.
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="desc"
                                name="desc"
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="star">
                                Select a rating star
                            </Form.Label>
                            <select
                                className="custom-select"
                                value={star}
                                onChange={(e) => {
                                    setStar(e.target.value);
                                }}
                                required
                            >
                                {renderStarOptions()}
                            </select>
                        </Form.Group>

                        <Form.Group>{renderSubmitReviewButton()}</Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ReviewForm;
