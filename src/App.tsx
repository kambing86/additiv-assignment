import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const SearchPage = lazy(() => import("./pages/SearchPage"));
const OverviewPage = lazy(() => import("./pages/OverviewPage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Switch>
            <Redirect from="/" to="/search" exact />
            <Route path="/search" component={SearchPage} exact />
            <Route
              path="/overview/:employeeName"
              component={OverviewPage}
              exact
            />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
