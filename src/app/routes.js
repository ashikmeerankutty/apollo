import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import App from "./components/App";

class Routes extends Component {

  render() {
    return (
      <Router>
        <App>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
        </App>
      </Router>
    );
  }
}

export default Routes;
