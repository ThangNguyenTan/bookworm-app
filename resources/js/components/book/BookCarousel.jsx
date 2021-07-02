import React from "react";
import BookItem from "./BookItem";
import Slider from "react-slick";

function BookCarousel({ books }) {
    const renderCarouselItem = () => {
        return books.map((bookItem) => {
            return <BookItem key={bookItem.id} bookItem={bookItem} />;
        });
    };

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <div
                className={`carousel-nav next`}
                onClick={onClick}
            >
                <i className="fas fa-caret-right"></i>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <div
                className="carousel-nav prev"
                onClick={onClick}
            >
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
                    slidesToShow: 3,
                    slidesToScroll: 3,
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
