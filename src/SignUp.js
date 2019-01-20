import React, { Component } from "react";
import axios from "axios";
import Message from "./Message";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pass: "",
      connection: false
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handelSubmit = e => {
    e.preventDefault();

    const config = {
      login: this.state.login,
      pass: this.state.pass
    };

    let Url = "http://localhost:3001/auth";

    axios
      .post(Url, config)

      .then(res => {
        localStorage.setItem("token", res.headers["x-access-token"])
      })
      .then(NotConnected => {
        if (!NotConnected) {
          return (
            this.setState({ submit: true, connection: true }),
            console.log(this.state.connection)
            /*alert(`Vous ètes connécté ${this.state.login}`)*/
          );
        }
      });
  };

  protectedRoute() {
    const token = localStorage.getItem("token");
    axios({
      method: "POST",
      url: "http://localhost:3001/auth/protected",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => console.log(res));
  }
  render() {
    const { connection } = this.state;

    if (connection) {
      require("./Message.css");

      return (
        <div>
          <Router>
            <div>
              <Button
                className="Continue"
                style={{ marginRight: "3%", padding: "1%" }}
                variant="contained"
                color="primary"
                onClick={this.protectedRoute}
              >
                <NavLink className="signup" to="/message">
                  Continue
                </NavLink>
              </Button>
              <Route
                path="/message"
                render={props => (
                  <Message login={this.state.login} pass={this.state.pass} />
                )}
              />
            </div>
          </Router>
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={this.handelSubmit}>
          {" "}
          <img
            className="Owl"
            src="http://icons.iconarchive.com/icons/thesquid.ink/free-flat-sample/96/owl-icon.png"
            alt="Owl"
          />
          <div className="form-data">
            <label htmlFor="login" className="Textlog">
              Login :{" "}
            </label>
            <Input
              type="text"
              id="login"
              name="login"
              onChange={this.onChange}
              value={this.state.login}
              required
            />
          </div>
          <div className="form-data">
            <label htmlFor="pass" className="Textlog">
              Pass :{" "}
            </label>
            <Input
              type="password"
              id="pass"
              name="pass"
              onChange={this.onChange}
              value={this.state.poster}
              required
              minLength="4"
            />
          </div>
          <div className="form-data">
            <input className="BtnSend" type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
