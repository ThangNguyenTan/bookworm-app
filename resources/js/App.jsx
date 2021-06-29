import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/partials/Layout";
import Home from "./pages/Home";

function App() {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
