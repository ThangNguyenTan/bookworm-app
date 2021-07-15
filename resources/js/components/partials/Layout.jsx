import React from "react";
import { Footer } from "../Footer";
import { Navigator } from "../Navigator";

function Layout({ children }) {
    return (
        <div className="wrapper">
            <Navigator />
            <main id="main">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
