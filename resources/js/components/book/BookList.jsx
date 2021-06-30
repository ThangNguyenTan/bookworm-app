import React from 'react';
import BookItem from './BookItem';
import ErrorBox from '../Partials/ErrorBox';

function BookList(props) {

    const renderBookItems = () => {
        if (props.books && props.books.length > 0) {
            return props.books.map(bookItem => {
                return <BookItem key={bookItem.id} bookItem={bookItem}/>
            })
        } else {
            return <div className="error-container">
                <ErrorBox message={`Currently, there is no book`} />
            </div>
        }
    }

    return (
        <div className="row book-list">
            {renderBookItems()}
        </div>
    )
}

export default BookList
