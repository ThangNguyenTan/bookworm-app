import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors, getAllBooks, getAllCategories } from "../actions";
import { BookList } from "../components/book";
import {
    ErrorBox,
    GridButtonGroup,
    LoadingBox,
    Paginator,
} from "../components/partials";
import data from "../data";

function Shop(props) {
    const dispatch = useDispatch();
    const bookListReducer = useSelector((state) => state.bookListReducer);
    const categoryListReducer = useSelector(
        (state) => state.categoryListReducer
    );
    const authorListReducer = useSelector((state) => state.authorListReducer);
    const {
        loading,
        error,
        books,
        pageObject: pageObjectGlobal,
    } = bookListReducer;
    const {
        loading: categoryLoading,
        error: categoryError,
        categories,
    } = categoryListReducer;
    const {
        loading: authorLoading,
        error: authorError,
        authors,
    } = authorListReducer;

    const sortByQueryString = props.location.search
        ? props.location.search.split("=")[1]
        : "popularity";

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [viewMode, setViewMode] = useState("portrait");
    const [searchedCategories, setSearchedCategories] = useState("");
    const [searchedAuthors, setSearchedAuthors] = useState("");
    const [searchedRating, setSearchedRating] = useState(0);
    const [selectedSortCriteria, setSelectedSortCriteria] =
        useState(sortByQueryString);

    const resetSearch = () => {
        setSearchedCategories("");
        setSearchedAuthors("");
        setSearchedRating(0);
    };

    const selectCategoryItem = (categoryID) => {
        resetSearch();

        if (categoryID === searchedCategories) {
            return setSearchedCategories("");
        }

        setSearchedCategories(categoryID);
    };

    const selectAuthorItem = (authorID) => {
        resetSearch();

        if (authorID === searchedAuthors) {
            return setSearchedAuthors("");
        }

        setSearchedAuthors(authorID);
    };

    const onChangeViewMode = (view) => {
        setViewMode(view);
    };

    const onChangePageNumber = (pageNum) => {
        pageNum = parseInt(pageNum);
        setCurrentPage(pageNum);
    };

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

    const renderSearchByCategoriesPanel = () => {
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Category
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {categoryError && <ErrorBox message={categoryError} />}

                        {categoryLoading ? (
                            <LoadingBox />
                        ) : (
                            <div className="categories-group row">
                                {categories.map((category) => {
                                    return (
                                        <div
                                            key={category.id}
                                            className={`category-item ${
                                                searchedCategories ===
                                                category.id
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                selectCategoryItem(category.id)
                                            }
                                        >
                                            {category.category_name}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    };

    const renderSearchByAuthorsPanel = () => {
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Author
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        {authorError && <ErrorBox message={authorError} />}

                        {authorLoading ? (
                            <LoadingBox />
                        ) : (
                            <div className="author-group categories-group row">
                                {authors.map((author) => {
                                    return (
                                        <div
                                            key={author.id}
                                            className={`category-item ${
                                                searchedAuthors === author.id
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                selectAuthorItem(author.id)
                                            }
                                        >
                                            {author.author_name}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    };

    const renderSearchByReviewsPanel = () => {
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
                                            searchedRating ===
                                            reviewCriteria.value
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            resetSearch();
                                            if (
                                                searchedRating ===
                                                reviewCriteria.value
                                            ) {
                                                return setSearchedRating(0);
                                            }
                                            setSearchedRating(
                                                reviewCriteria.value
                                            );
                                        }}
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

    const renderSearchTitle = () => {
        let ans = "";
        let withAnd = false;

        if (searchedCategories) {
            ans += `Category `;
            withAnd = true;
            ans += `#${searchedCategories}`;
        }

        if (searchedAuthors) {
            ans += `${withAnd ? " and" : ""} Author `;
            withAnd = true;
            ans += `#${searchedAuthors}`;
        }

        if (searchedRating != 0) {
            ans += `${withAnd ? " and" : ""} Rating `;
            withAnd = true;
            ans += `${searchedRating} star(s) and above`;
        }

        return ans;
    };

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllAuthors());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getAllBooks({
                currentPage,
                pageSize,
                searchedCategories,
                searchedAuthors,
                searchedRating,
                selectedSortCriteria,
            })
        );
    }, [
        currentPage,
        pageSize,
        searchedCategories,
        searchedAuthors,
        searchedRating,
        selectedSortCriteria,
    ]);

    return (
        <div id="shop-page">
            <div className="page-header">
                <Container>
                    <h2>
                        Shop{" "}
                        <span>
                            (Filtered by {renderSearchTitle() || "N/A"})
                        </span>
                    </h2>
                </Container>
            </div>

            <Container>
                <Row>
                    <Col lg={3} md={4} sm={12}>
                        <h5 className="mb-4">Filter By</h5>
                        <Accordion defaultActiveKey="0">
                            {renderSearchByCategoriesPanel()}
                            {renderSearchByAuthorsPanel()}
                            {renderSearchByReviewsPanel()}
                        </Accordion>
                    </Col>

                    <Col lg={9} md={8} sm={12}>
                        {error && <ErrorBox message={error} />}

                        {loading || !pageObjectGlobal ? (
                            <LoadingBox />
                        ) : (
                            <>
                                <div className="shop-result-header mb-4">
                                    <Row className="align-items-center">
                                        <Col
                                            lg={5}
                                            md={12}
                                            sm={12}
                                            className="mt-2"
                                        >
                                            {pageObjectGlobal.totalItems ===
                                            0 ? (
                                                <p>No result</p>
                                            ) : (
                                                <p>{`Showing ${
                                                    pageObjectGlobal.startIndex +
                                                    1
                                                } -
                                                ${
                                                    pageObjectGlobal.endIndex +
                                                    1
                                                } of ${
                                                    pageObjectGlobal.totalItems
                                                } results`}</p>
                                            )}
                                        </Col>
                                        <Col
                                            lg={7}
                                            md={12}
                                            sm={12}
                                            className="utils-container"
                                        >
                                            <Row>
                                                <Col lg={5} md={5} sm={6}>
                                                    {renderSortBySelect()}
                                                </Col>
                                                <Col lg={4} md={4} sm={6}>
                                                    {renderPageSizeSelect()}
                                                </Col>
                                                <Col lg={3} md={3} sm={6}>
                                                    <GridButtonGroup
                                                        viewMode={viewMode}
                                                        onChangeViewMode={
                                                            onChangeViewMode
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>

                                <BookList books={books} viewMode={viewMode} />

                                <Paginator
                                    toTop
                                    pageObject={pageObjectGlobal}
                                    onChangePageNumber={onChangePageNumber}
                                />
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Shop;
