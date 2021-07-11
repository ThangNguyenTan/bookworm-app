import React from "react";
import CardItem from "../card/CardItem";
import Slider from "react-slick";

function BookCarousel({ books }) {
    const renderCarouselItem = () => {
        return books.map((bookItem) => {
            const item = {
                discount_price: bookItem.discount_price,
                original_price: bookItem.book_price,
                title: bookItem.book_title,
                author_name: bookItem.author_name,
                author_id: bookItem.author_id,
                cover_photo: bookItem.book_cover_photo,
                id: bookItem.id,
            };
            return <CardItem key={bookItem.id} item={item} />;
        });
    };

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <div className={`carousel-nav next`} onClick={onClick}>
                <i className="fas fa-caret-right"></i>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <div className="carousel-nav prev" onClick={onClick}>
                <i className="fas fa-caret-left"></i>
            </div>
        );
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="book-carousel">
            <Slider {...settings}>{renderCarouselItem()}</Slider>
        </div>
    );
}

export default BookCarousel;
