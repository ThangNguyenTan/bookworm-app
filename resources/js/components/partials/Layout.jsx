import React from 'react'
import Navigator from './Navigator'

function Layout({children}) {
    return (
        <div className="wrapper">
            <Navigator/>
            <main id="main">
                {children}
            </main>
        </div>
    )
}

export default Layout
