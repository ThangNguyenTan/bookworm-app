import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/partials/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";
import ScrollToTop from "./components/partials/ScrollToTop";

function App() {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <ScrollToTop/>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" exact component={About} />
                        <Route path="/shop" exact component={Shop} />
                        <Route path="/cart" exact component={Cart} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/books/:bookID" exact component={BookDetails} />
                        <Route path="/orders/:orderID" exact component={OrderDetails} />
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
