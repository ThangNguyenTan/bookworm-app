import React from "react";
import { Card, Accordion } from "react-bootstrap";
import data from "../../../data";

const RatingsPanel = ({ searchedRating, onChangeSearchedRatings }) => {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
                Review
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
                <Card.Body>
                    <div className="categories-group row">
                        {data.reviewCriterias.map((reviewCriteria) => {
                            return (
                                <div
                                    key={reviewCriteria.id}
                                    className={`category-item ${
                                        searchedRating === reviewCriteria.value
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        onChangeSearchedRatings(
                                            reviewCriteria.value
                                        )
                                    }
                                >
                                    {reviewCriteria.name}
                                </div>
                            );
                        })}
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

export default RatingsPanel;
