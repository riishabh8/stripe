import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Plans from "./Plans";
import SignUpPage from "./SignUp";

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/plans" component={Plans} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
