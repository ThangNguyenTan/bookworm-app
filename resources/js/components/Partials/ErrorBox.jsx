import React from 'react'

function ErrorBox({message}) {
    return (
        <div className="container">
            <h3>{message}</h3>
        </div>
    )
}

export default ErrorBox
