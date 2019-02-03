import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button"
import { Redirect } from 'react-router-dom'
import arrow from "./images/left-arrow.png"

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pass: "",
      Back: false
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

  submitForm = (e, state) => {
    e.preventDefault();

    const config = {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ login: this.state.login, pass: this.state.pass })
    };

    let Url = "http://localhost:3001/users";

    fetch(Url, config).then(res => {
      if (res.status === 200) {
        return alert(`Welcome to Database ${this.state.login} !`)
      } else if (res.status === 409) {
        return alert(`User ${this.state.login} already exists`)
      }


    }

    );
  };

  render() {
    if (this.state.Back) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <Button name='Back' color='primary' value='Back'
          style={{ marginLeft: '2%',color:'#000' }} onClick={this.handleClick}>
          <img className="arrow" src={arrow} alt="back arrow" /> Back
        </Button>
        <form onSubmit={this.submitForm}>
          <div style={{ marginBottom: '1%' }}>

          </div>
          <img
            className="Owl"
            src="http://icons.iconarchive.com/icons/thesquid.ink/free-flat-sample/96/owl-icon.png"
            alt="Owl"
          />
          <div className="x-www-form-urlencoded">
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
              value={this.state.pass}
              required
              minLength="4"
            />
          </div>
          <div className="form-data">
            <input className="BtnSend" type="submit" value="Send" />
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
