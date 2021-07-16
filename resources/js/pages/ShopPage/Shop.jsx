import React, { useEffect, useState } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors, getAllBooks, getAllCategories } from "../../actions";
import { BookList } from "../../components/BookList";
import {
    ErrorBox,
    GridButtonGroup,
    LoadingBox,
} from "../../components/Partials";
import { Paginator } from "../../components/Paginator";
import data from "../../data";
import { AuthorsPanel, CategoriesPanel, RatingsPanel } from "./components";

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

    const selectCategoryItem = (categoryID) => {
        setSearchedCategories("");
        setCurrentPage(1);

        if (categoryID === searchedCategories) {
            return setSearchedCategories("");
        }

        setSearchedCategories(categoryID);
    };

    const selectAuthorItem = (authorID) => {
        setSearchedAuthors("");
        setCurrentPage(1);

        if (authorID === searchedAuthors) {
            return setSearchedAuthors("");
        }

        setSearchedAuthors(authorID);
    };

    const onChangeViewMode = (view) => {
        setViewMode(view);
    };

    const onChangeSearchedRatings = (reviewCriteriaValue) => {
        setSearchedRating(0);
        setCurrentPage(1);

        if (searchedRating === reviewCriteriaValue) {
            return setSearchedRating(0);
        }
        setSearchedRating(reviewCriteriaValue);
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
       
        data.pageSizeCriterias.forEach((pageSizeCriteria) => {
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
            <CategoriesPanel
                searchedCategories={searchedCategories}
                selectCategoryItem={selectCategoryItem}
                categoryError={categoryError}
                categoryLoading={categoryLoading}
                categories={categories}
            />
        );
    };

    const renderSearchByAuthorsPanel = () => {
        return (
            <AuthorsPanel
                searchedAuthors={searchedAuthors}
                selectAuthorItem={selectAuthorItem}
                authorError={authorError}
                authorLoading={authorLoading}
                authors={authors}
            />
        );
    };

    const renderSearchByReviewsPanel = () => {
        return (
            <RatingsPanel
                searchedRating={searchedRating}
                onChangeSearchedRatings={onChangeSearchedRatings}
            />
        );
    };

    const renderSearchTitle = () => {
        let ans = "";
        let withAnd = false;

        if (searchedCategories) {
            ans += `Category: `;
            withAnd = true;
            ans += `${
                categories.find((category) => {
                    return searchedCategories === category.id;
                }).category_name
            }`;
        }

        if (searchedAuthors) {
            ans += `${withAnd ? " and" : ""} Author: `;
            withAnd = true;
            ans += `${
                authors.find((author) => {
                    return searchedAuthors === author.id;
                }).author_name
            }`;
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
