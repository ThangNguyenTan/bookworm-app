import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, ScrollToTop } from "./components/partials";
import {
    About,
    BookDetails,
    Cart,
    Home,
    OrderDetails,
    Profile,
    Shop,
} from "./pages";

function App() {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <ScrollToTop />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" exact component={About} />
                        <Route path="/shop" exact component={Shop} />
                        <Route path="/cart" exact component={Cart} />
                        <Route path="/profile" exact component={Profile} />
                        <Route
                            path="/books/:bookID"
                            exact
                            component={BookDetails}
                        />
                        <Route
                            path="/orders/:orderID"
                            exact
                            component={OrderDetails}
                        />
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
