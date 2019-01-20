import React, { Component } from "react";
import Input from "@material-ui/core/Input";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pass: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = (e, state) => {
    alert("thank you");
    e.preventDefault();

    const config = {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ login: this.state.login, pass: this.state.pass })
    };

    let Url = "http://localhost:3001/users";

    fetch(Url, config).then(
      alert(`Bienvenue sur la base de donnée ${this.state.login} !`)
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
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
