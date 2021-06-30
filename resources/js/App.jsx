import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/partials/Layout";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" exact component={About} />
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
