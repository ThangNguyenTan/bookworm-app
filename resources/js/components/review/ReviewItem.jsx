import React from 'react'

function ReviewItem() {
    return (
        <div className="review-item">
            <div className="review-item__header">
                <h4>Review Title</h4>
                <div className="mx-2">|</div>
                <p>5 star(s)</p>
            </div>
            <div className="review-item__body">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, molestiae necessitatibus impedit ipsam sequi, eaque ratione cupiditate veniam maiores esse nobis placeat nemo! Iure ex voluptatibus in, deserunt excepturi expedita.</p>
            </div>
            <div className="review-item__footer">
                <h6>April 26, 2021</h6>
            </div>
        </div>
    )
}

export default ReviewItem
