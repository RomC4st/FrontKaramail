import React, { Component } from "react";

import "./App.css";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Button from "@material-ui/core/Button";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>@ Karamail </h1>
        </header>

        <Router>
          <div>
            <div className="navbar">
              <Button
                style={{ marginRight: "3%", padding: "1%" }}
                variant="contained"
                color="primary"
              >
                <NavLink className="signin" to="/signin">
                  Sign In
                </NavLink>
                <div className="space" />
              </Button>
              <Button
                style={{ marginLeft: "3%", padding: "1%" }}
                variant="contained"
                color="secondary"
              >
                <NavLink className="signup" to="/signup">
                  Sign Up
                </NavLink>
              </Button>
            </div>

            <Route exact path="/" />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
