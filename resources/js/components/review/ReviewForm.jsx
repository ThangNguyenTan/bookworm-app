import React, {useState} from "react";
import { Card, Form } from "react-bootstrap";
import data from "../../data";

function ReviewForm() {
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

    return (
        <div id="review-form">
            <Card>
                <Card.Header>
                    <h2>Write a Review</h2>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="title">Add a title</Form.Label>
                            <Form.Control
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
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
                                    setTitle(e.target.value);
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
                            >
                                {renderStarOptions()}
                            </select>
                        </Form.Group>

                        <Form.Group>
                            <button type="submit" className="button dark block">
                                Submit Review
                            </button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ReviewForm;
