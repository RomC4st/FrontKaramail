import React, { Component } from "react";
import axios from "axios";
import Message from "./Message";
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import arrow from "./images/left-arrow.png"

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      pass: null,
      connection: false,
      back: false,
      token: null
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    this.setState({
      Back: true
    })
  }

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
        localStorage.setItem("KaraToken", res.headers["x-access-token"])
      })
      .then(NotConnected => {
        if (!NotConnected) {
          return (
            this.setState({
              submit: true, connection: true,
            }),
            console.table(this.state)
            /*alert(`Vous ètes connécté ${this.state.login}`)*/
          );
        }
      });
  };

  protectedRoute() {

    const token = localStorage.getItem("KaraToken");
    axios({
      method: "POST",
      url: "http://localhost:3001/auth/protected",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  render() {

    const { connection, Back } = this.state;
    if (Back) {
      return <Redirect to='/' />
    }
    if (connection) {


      return (

        < div >

          <Router>
            <div>

              <Button
                className="Continue"
                variant="contained"
                color="primary"
                onClick={this.protectedRoute}
              >
                <NavLink className="signup" to="/dashboard">
                  Continue
                </NavLink>
              </Button>
              <Route
                path="/dashboard"
                render={props => (
                  <Message login={this.state.login} pass={this.state.pass} />
                )}
              />
            </div>
          </Router>

        </div >
      );
    }
    return (
      <div>
        <Button name='Back' color='primary' value='Back'
          style={{ marginLeft: '2%', color: '#000' }} onClick={this.handleClick}>
          <img className="arrow" src={arrow} alt="back arrow" /> Back
        </Button>
        <form onSubmit={this.handelSubmit}>

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
