import React, { useEffect } from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../actions/authorActions";
import { getAllBooks } from "../actions/bookActions";
import { getAllCategories } from "../actions/categoryActions";
import BookList from "../components/book/BookList";
import ErrorBox from "../components/Partials/ErrorBox";
import LoadingBox from "../components/partials/LoadingBox";

function Shop() {
    const dispatch = useDispatch();
    const bookListReducer = useSelector((state) => state.bookListReducer);
    const categoryListReducer = useSelector(
        (state) => state.categoryListReducer
    );
    const authorListReducer = useSelector((state) => state.authorListReducer);
    const { loading, error, books } = bookListReducer;
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

    const renderSortBySelect = () => {
        let options = [];
        const sortCriterias = [
            "Price (Low to High)",
            "Price (High to Low)",
        ]

        sortCriterias.forEach(sortCriteria => {
            options.push(
                <option key={sortCriteria} value={sortCriteria}>{sortCriteria}</option>
            )
        });

        return (
            <select className="custom-select">
                {options}
            </select>
        )
    }

    const renderPageSizeSelect = () => {
        let options = [];
        const pageSizeCriterias = [
            {
                name: "Show 5",
                size: 5
            },
            {
                name: "Show 15",
                size: 15
            },
            {
                name: "Show 20",
                size: 20
            },
            {
                name: "Show 25",
                size: 25
            }
        ]

        pageSizeCriterias.forEach(pageSizeCriteria => {
            options.push(
                <option key={pageSizeCriteria.name} value={pageSizeCriteria.size}>{pageSizeCriteria.name}</option>
            )
        });

        return (
            <select className="custom-select">
                {options}
            </select>
        )
    }

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
                                            className={`category-item `}
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
                            <div className="categories-group row">
                                {authors.map((author) => {
                                    return (
                                        <div
                                            key={author.id}
                                            className={`category-item `}
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

    useEffect(() => {
        dispatch(getAllBooks());
        dispatch(getAllCategories());
        dispatch(getAllAuthors());
    }, [dispatch]);

    /*
    useEffect(() => {
        if (!loading && !error) {
            let currentBooksData = sortBooks(books, {
                searchedName,
                searchedPrice,
                searchedReviews,
                searchedCategories,
                sortCriteria,
            });

            const pageObject = paginate(
                currentBooksData.length,
                currentPage,
                8,
                6
            );
            currentBooksData = currentBooksData.slice(
                pageObject.startIndex,
                pageObject.endIndex + 1
            );

            setPageObjectGlobal(pageObject);
            setCurrentBooks(currentBooksData);
        }
    }, [
        currentPage,
        books,
        loading,
        error,
        searchedName,
        searchedPrice,
        searchedReviews,
        searchedCategories,
        sortCriteria,
    ]);
    */

    return (
        <div id="shop-page">
            <div className="page-header">
                <Container>
                    <h2>
                        Shop <span>(Filtered by Category #1)</span>
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
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                    Review
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        {"Hello! I'm another body"}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>

                    <Col lg={9} md={8} sm={12}>
                        {error && <ErrorBox message={error} />}

                        {loading ? (
                            <LoadingBox />
                        ) : (
                            <>
                                <div className="shop-result-header mb-4">
                                    <Row className="align-items-center">
                                        <Col lg={6} md={6} sm={12}>
                                            <p>Showing 1–12 of 126 results</p>
                                        </Col>
                                        <Col lg={6} md={6} sm={12}>
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

                                <BookList books={books} />
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Shop;
