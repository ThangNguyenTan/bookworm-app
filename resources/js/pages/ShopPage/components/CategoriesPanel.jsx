import React from "react";
import { ErrorBox, LoadingBox } from "../../../components/Partials";
import { Card, Accordion } from "react-bootstrap";

const CategoriesPanel = ({
    searchedCategories,
    selectCategoryItem,
    categoryError,
    categoryLoading,
    categories,
}) => {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
                Category
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    {categoryError && <ErrorBox message={categoryError} />}

                    {categoryLoading && !categoryError ? (
                        <LoadingBox />
                    ) : (
                        <div className="categories-group row">
                            {categories.map((category) => {
                                return (
                                    <div
                                        key={category.id}
                                        className={`category-item ${
                                            searchedCategories === category.id
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

export default CategoriesPanel;
