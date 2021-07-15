import React, { useEffect } from "react";
import { Col, Container, Row, Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecBooks } from "../../actions";
import { BookList } from "../../components/BookList";
import { CarouselList } from "./components";
import { ErrorBox, LoadingBox } from "../../components/Partials";

function Home() {
    const dispatch = useDispatch();
    const recBookListReducer = useSelector((state) => state.recBookListReducer);
    const { loading, error, popularBooks, onSaleBooks, highlyRatedBooks } =
        recBookListReducer;

    useEffect(() => {
        dispatch(getRecBooks());
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
                            <Link
                                to="/shop?sort-by=onsale"
                                className="btn btn-dark"
                            >
                                View All <i className="fas fa-caret-right"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="on-sale__carousel">
                        <CarouselList carouselItems={onSaleBooks.map(bookItem => {
                            const item = {
                                discount_price: bookItem.discount_price,
                                original_price: bookItem.book_price,
                                title: bookItem.book_title,
                                author_name: bookItem.author_name,
                                author_id: bookItem.author_id,
                                cover_photo: bookItem.book_cover_photo,
                                id: bookItem.id,
                            };
                            return item;
                        })} />
                    </div>
                </section>

                <section id="featured-books">
                    <Container>
                        <Tab.Container
                            id="left-tabs-example"
                            defaultActiveKey="first"
                        >
                            <Row>
                                <Col
                                    sm={12}
                                    className="featured-books__tab-container"
                                >
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
                                <Col
                                    sm={12}
                                    className="featured-books__result-container"
                                >
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <BookList
                                                books={highlyRatedBooks}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <BookList books={popularBooks} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Container>
                </section>
            </Container>
        </div>
    );
}

export default Home;
