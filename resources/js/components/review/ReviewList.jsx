import React, {useState} from "react";
import { Col, Row } from "react-bootstrap";
import data from "../../data";
import ReviewItem from "./ReviewItem";

function ReviewList() {

    const [pageSize, setPageSize] = useState(15);
    const [selectedSortCriteria, setSelectedSortCriteria] = useState("atoz");

    const renderReviewItems = () => {
        let ans = [];

        for (let index = 0; index < 5; index++) {
            ans.push(<ReviewItem key={index}/>)
        }

        return ans;
    }

    const renderSortBySelect = () => {
        let options = [];

        data.sortCriterias.forEach((sortCriteria) => {
            options.push(
                <option key={sortCriteria.value} value={sortCriteria.value}>
                    {sortCriteria.name}
                </option>
            );
        });

        return (
            <select
                className="custom-select"
                value={selectedSortCriteria}
                onChange={(e) => {
                    setSelectedSortCriteria(e.target.value);
                }}
            >
                {options}
            </select>
        );
    };

    const renderPageSizeSelect = () => {
        let options = [];
        const pageSizeCriterias = [
            {
                name: "Show 5",
                size: 5,
            },
            {
                name: "Show 15",
                size: 15,
            },
            {
                name: "Show 20",
                size: 20,
            },
            {
                name: "Show 25",
                size: 25,
            },
        ];

        pageSizeCriterias.forEach((pageSizeCriteria) => {
            options.push(
                <option
                    key={pageSizeCriteria.name}
                    value={pageSizeCriteria.size}
                >
                    {pageSizeCriteria.name}
                </option>
            );
        });

        return (
            <select
                className="custom-select"
                onChange={(e) => {
                    setPageSize(e.target.value);
                }}
                value={pageSize}
            >
                {options}
            </select>
        );
    };

    return (
        <div className="review-list">
            <div className="review-list__header">
                <h2>
                    Customer Reviews <span>(Filtered by 5 star(s))</span>
                </h2>
            </div>
            <div className="review-list__sub-header">
                <h2>4.6 Star(s)</h2>
                <div className="review-list__ratings">
                    <ul>
                        <li>(3,134)</li>
                        <li>5 stars (200)</li>
                        <li className="divider">|</li>
                        <li>4 stars (400)</li>
                        <li className="divider">|</li>
                        <li>3 stars (300)</li>
                        <li className="divider">|</li>
                        <li>2 stars (100)</li>
                        <li className="divider">|</li>
                        <li>1 star (0)</li>
                    </ul>
                </div>
            </div>
            <div className="review-list__result-header">
                <Row className="align-items-center">
                    <Col lg={5} md={6} sm={12} className="mt-2">
                        {/*
                        {pageObjectGlobal.totalItems === 0 ? (
                            <p>No result</p>
                        ) : (
                            <p>{`Showing ${pageObjectGlobal.startIndex + 1} -
                                                ${
                                                    pageObjectGlobal.endIndex +
                                                    1
                                                } of ${
                                pageObjectGlobal.totalItems
                            } results`}</p>
                        )}
                        */}
                        Showing 1 - 15 of 276 results
                    </Col>
                    <Col lg={7} md={6} sm={12}>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                {renderSortBySelect()}
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                {renderPageSizeSelect()}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="review-list__result">
                {renderReviewItems()}
            </div>
        </div>
    );
}

export default ReviewList;
