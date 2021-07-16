import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../actions";
import data from "../../data";
import { AlertBox, ErrorBox } from "../Partials";

function ReviewForm({ bookID }) {
    const dispatch = useDispatch();

    const reviewActionReducer = useSelector(
        (state) => state.reviewActionReducer
    );
    const { loading, error } = reviewActionReducer;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [star, setStar] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [alertBoxContainer, setAlertBoxContainer] = useState(<></>);

    useEffect(() => {
        if (isSubmitted && !loading && !error) {
            setAlertBoxContainer(
                <AlertBox isShowed={true} message={"Added a review"} />
            );
            setTimeout(() => {
                setAlertBoxContainer(<></>);
            }, 5000);
            setIsSubmitted(false);
        }
    }, [isSubmitted, loading, error]);

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
        setIsSubmitted(true);
    };

    if (error) {
        return <ErrorBox message={error} />;
    }

    const renderSubmitReviewButton = () => {
        if (loading) {
            return (
                <button type="button" className="btn btn-dark btn-block">
                    Loading...
                </button>
            );
        }

        return (
            <button type="submit" className="btn btn-dark btn-block">
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
                    {alertBoxContainer}
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
