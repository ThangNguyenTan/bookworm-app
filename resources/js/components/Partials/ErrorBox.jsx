import React from 'react'

function ErrorBox({message}) {
    return (
        <div className="container">
            <h3>Error: {message}</h3>
        </div>
    )
}

export default ErrorBox
