import React, { useEffect } from "react";
import { Col, Container, Row, Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBooks } from "../actions/bookActions";
import BookCarousel from "../components/book/BookCarousel";
import BookList from "../components/book/BookList";
import ErrorBox from "../components/Partials/ErrorBox";
import LoadingBox from "../components/partials/LoadingBox";

function Home() {
    const dispatch = useDispatch();
    const bookListReducer = useSelector((state) => state.bookListReducer);
    const { loading, error, books } = bookListReducer;

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    if (error) {
        return <ErrorBox message={error} />;
    }

    if (loading) {
        return <LoadingBox />;
    }

    return (
        <div id="home-page">
            <Container>
                <section id="on-sale">
                    <div className="on-sale__header">
                        <h4>On Sale</h4>
                        <div>
                            <Link to="/shop" className="btn btn-dark">
                                View All <i className="fas fa-caret-right"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="on-sale__carousel">
                        <BookCarousel books={books} />
                    </div>
                </section>

                <section id="featured-books">
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="first"
                    >
                        <Row>
                            <Col sm={12} className="featured-books__tab-container">
                                <h4>Featured Books</h4>
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">
                                            Recommended
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">
                                            Popular
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={12} className="featured-books__result-container">
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <BookList books={books.slice(0, 8)}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <BookList books={books.slice(0, 8)}/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </section>
            </Container>
        </div>
    );
}

export default Home;
