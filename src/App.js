import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Message from './Message';
import NavBar from './NavBar';
import ResetPassword from'./Reset'


class App extends Component {



  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>@ Karamail </h1>
        </header>

        <Switch>
          <div>
            <Route exact path='/dashboard' component={Message} />
            <Route exact path="/" component={NavBar} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route path="/reset_password/:login" component={ResetPassword} />
          </div>
        </Switch>



      </div>
    );
  }
}

export default App;
