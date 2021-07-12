import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function About() {
    return (
        <div id="about-page">
            <div className="page-header">
                <Container>
                    <h2>About Us</h2>
                </Container>
            </div>

            <div className="container about-content">
                <div className="about-top">
                    <h1>Welcome to Bookworm</h1>
                    <p>
                        {`"Bookworm is an independent New York bookstore and
                        language school with locations in Manhattan and
                        Brooklyn. We specialize in travel books and language
                        classes."`}
                    </p>
                </div>

                <div className="about-bottom">
                    <Row>
                        <Col md={6} sm={12}>
                            <h2>Our Story</h2>
                            <p>
                                The name Bookworm was taken from the original
                                name for New York International Airport, which
                                was renamed JFK in December 1963.
                            </p>
                            <p>
                                Our Manhattan store was just moved to the West
                                Village. Our new location is 170 7th Avenue
                                South, at the corner of Perry Street.
                            </p>
                            <p>
                                From March 2008 through May 2016, the store was
                                located in the Flatiron District.
                            </p>
                        </Col>

                        <Col md={6} sm={12}>
                            <h2>Our Vision</h2>
                            <p>
                                One of the last travel bookstores in the
                                country, our Manhattan store carries a range of
                                guidebooks (all 10% off) to suit the needs and
                                tastes of every traveler and budget.
                            </p>
                            <p>
                                We believe that a novel or travelogue can be
                                just as valuable a key to a place as any
                                guidebook, and our well-read, well-traveled
                                staff is happy to make reading recommendations
                                for any travelers, book lovers, or gift givers.
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default About;
