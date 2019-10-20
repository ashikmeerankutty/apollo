import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MapsPage from "./pages/MapsPage";
import AccountPage from "./pages/AccountPage";
import ViewPage from "./pages/ViewPage";
import App from "./components/App";

class Routes extends Component {
  render() {
    return (
      <Router>
        <App>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/maps" component={MapsPage} />
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/view" component={ViewPage} />
        </App>
      </Router>
    );
  }
}

export default Routes;
