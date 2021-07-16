import React from "react";
import { ErrorBox, LoadingBox } from "../../../components/Partials";
import { Card, Accordion } from "react-bootstrap";

const AuthorsPanel = ({
    searchedAuthors,
    selectAuthorItem,
    authorError,
    authorLoading,
    authors,
}) => {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
                Author
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
                <Card.Body>
                    {authorError && <ErrorBox message={authorError} />}

                    {authorLoading && !authorError ? (
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

export default AuthorsPanel;
