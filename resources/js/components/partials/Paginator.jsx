import React from "react";
import { Pagination } from "react-bootstrap";

function Paginator(props) {
    const { pageObject, onChangePageNumber } = props;

    if (!pageObject) {
        return <></>;
    }

    const { currentPage, totalItems, pages, endPage } = pageObject;

    if (totalItems === 0) {
        return <></>;
    }

    const renderPaginationItems = () => {
        return pages.map((page) => {
            return (
                <Pagination.Item
                    onClick={() => onChangePageNumber(page)}
                    key={page}
                    active={page === currentPage}
                >
                    {page}
                </Pagination.Item>
            );
        });
    };

    return (
        <div className="pagination-container">
            <Pagination>
                <Pagination.Item
                    onClick={() => {
                        if (currentPage - 1 < 1) {
                            return;
                        }
                        onChangePageNumber(currentPage - 1);
                    }}
                >
                    Previous
                </Pagination.Item>
                {renderPaginationItems()}
                <Pagination.Item
                    onClick={() => {
                        if (currentPage + 1 > endPage) {
                            return;
                        }
                        onChangePageNumber(currentPage + 1);
                    }}
                >
                    Next
                </Pagination.Item>
            </Pagination>
        </div>
    );
}

export default Paginator;
