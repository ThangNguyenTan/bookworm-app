import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByBookID } from "../../actions/reviewActions";
import data from "../../data";
import { calculateTotalReviews } from "../../utils/calculation";
import ErrorBox from "../Partials/ErrorBox";
import LoadingBox from "../partials/LoadingBox";
import Paginator from "../partials/Paginator";
import ReviewItem from "./ReviewItem";

function ReviewList({ bookID }) {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [selectedSortCriteria, setSelectedSortCriteria] =
        useState("datedesc");
    const [searchedRating, setSearchedRating] = useState(0);

    const reviewListReducer = useSelector((state) => state.reviewListReducer);
    const {
        loading,
        error,
        reviews,
        reviewsStatus,
        pageObject: pageObjectGlobal,
    } = reviewListReducer;

    useEffect(() => {
        dispatch(
            getReviewsByBookID(bookID, {
                currentPage,
                pageSize,
                selectedSortCriteria,
                searchedRating,
            })
        );
    }, [currentPage, pageSize, selectedSortCriteria, searchedRating]);

    if (error) {
        return <ErrorBox message={error} />;
    }

    if (loading || !pageObjectGlobal) {
        return <LoadingBox />;
    }

    const onChangePageNumber = (pageNum) => {
        pageNum = parseInt(pageNum);
        setCurrentPage(pageNum);
    };

    const renderReviewItems = () => {
        return reviews.map((review) => {
            return <ReviewItem key={review.id} reviewItem={review} />;
        });
    };

    const renderSortBySelect = () => {
        let options = [];

        data.reviewSortCriterias.forEach((sortCriteria) => {
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

    // if (reviews.length === 0 && !loading && !error) {
    //     return (
    //         <div className="review-list">
    //             <div className="container text-center">
    //                 <h2>Currently, there is no review</h2>
    //             </div>
    //         </div>
    //     );
    // }

    const renderReviewSortItems = () => {
        let ans = [];

        for (let i = 1; i <= 5; i++) {
            if (i === 1) {
                ans.push(
                    <React.Fragment key={i}>
                        <li
                            className={searchedRating === i ? "active" : ""}
                            onClick={() => {
                                setSearchedRating(i);
                            }}
                        >
                            {i} star ({reviewsStatus[`numberof${i}starreviews`]}
                            )
                        </li>
                        <li className="divider">|</li>
                    </React.Fragment>
                );
                continue;
            }
            if (i === 5) {
                ans.push(
                    <React.Fragment key={i}>
                        <li
                            className={searchedRating === i ? "active" : ""}
                            onClick={() => {
                                setSearchedRating(i);
                            }}
                        >
                            {i} star ({reviewsStatus[`numberof${i}starreviews`]}
                            )
                        </li>
                    </React.Fragment>
                );
                continue;
            }
            ans.push(
                <React.Fragment key={i}>
                    <li
                        className={searchedRating === i ? "active" : ""}
                        onClick={() => {
                            setSearchedRating(i);
                        }}
                    >
                        {i} star ({reviewsStatus[`numberof${i}starreviews`]})
                    </li>
                    <li className="divider">|</li>
                </React.Fragment>
            );
        }

        return ans;
    };

    return (
        <div className="review-list">
            <div className="review-list__header">
                <h2>
                    Customer Reviews{" "}
                    <span>
                        (Filtered by{" "}
                        {searchedRating === 0 ? "all" : searchedRating} star(s))
                    </span>
                </h2>
            </div>
            <div className="review-list__sub-header">
                <h2>{reviewsStatus.ratings} Star(s)</h2>
                <div className="review-list__ratings">
                    <ul>
                        <li
                            className={searchedRating === 0 ? "active" : ""}
                            onClick={() => {
                                setSearchedRating(0);
                            }}
                        >
                            ({calculateTotalReviews(reviewsStatus)})
                        </li>
                        {renderReviewSortItems()}
                    </ul>
                </div>
            </div>
            <div className="review-list__result-header">
                <Row className="align-items-center">
                    <Col lg={5} md={6} sm={12} className="mt-2">
                        {pageObjectGlobal.totalItems === 0 ? (
                            <p>No result</p>
                        ) : (
                            <p>{`Showing ${pageObjectGlobal.startIndex + 1} -
                            ${pageObjectGlobal.endIndex + 1} of ${
                                pageObjectGlobal.totalItems
                            } results`}</p>
                        )}
                    </Col>
                    <Col lg={7} md={6} sm={12}>
                        <Row>
                            <Col lg={8} md={6} sm={6}>
                                {renderSortBySelect()}
                            </Col>
                            <Col lg={4} md={6} sm={6}>
                                {renderPageSizeSelect()}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="review-list__result">
                {renderReviewItems()}

                <Paginator
                    pageObject={pageObjectGlobal}
                    onChangePageNumber={onChangePageNumber}
                />
            </div>
        </div>
    );
}

export default ReviewList;
