import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid'
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import Input from "@material-ui/core/Input";
import axios from 'axios';
import Profil from './Profil'






TouchRipple.prototype.render = () => null;

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      id: null,
      prevItems: [],
      profil: false,
      token: undefined
    };
  }


  onChange = e => {
    this.setState({
      [e.target.name]: `${this.props.login}: ${e.target.value}`
    });
  };

  submitForm = (e, state) => {
    e.preventDefault();
    const Url = "http://localhost:3001/messages";
    const config = {

      message: this.state.message,
      userId: this.state.id
    };

    axios.post(Url, config).then(() => {
      this.setState({ prevItems: [] })
    })
  };

  router = () => {
    localStorage.removeItem("KaraToken");
    window.location.assign("http://localhost:3000/signup");
  };

  handleClick = e => {
    this.setState({
      profil: true
    })
  }

  componentDidUpdate() {

    if (this.state.prevItems !== this.state.items) {
      axios('http://localhost:3001/messages')
        .then(res => {
          this.setState({
            prevItems: res.data,
            items: res.data,
            token: localStorage.getItem("KaraToken")
          })

        })
    }
  }

  componentDidMount() {

    const url2 = 'http://localhost:3001/users/UserId';
    const config = {
      login: this.props.login,
    }
    const url1 = "http://localhost:3001/messages";
    axios(url1)

      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.data,
          },
          );
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    axios.post(url2, config)
      .then(res => {
        if (this.props.login !== undefined) {
          this.setState({
            id: res.data.id
          });
        }
      }
      )
      .catch(
        err => alert(err))

  }


  render() {

    const { items, error, isLoaded, profil } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (profil) {
      return <Profil id={this.state.id} login={this.props.login} />
    } else if (this.state.token === null) {
      return <h1 style={{
        textAlign: 'center'
      }}>Access Denied</h1>
    }
    else if (this.state.token !== null) {

      require("./Api.css")
      return (
        <div className="InputMessage">
          <div>
            <Grid sm={12}>
              <Button
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "50px",
                  width: "64px",
                  height: "64px",
                  marginLeft: '10px',

                }}
                className="logout"
                onClick={this.router}
              >
                <img
                  src="http://icons.iconarchive.com/icons/mazenl77/I-like-buttons/64/EZ-Shutdown-icon.png"
                  alt="disconnect"
                />
              </Button>
            </Grid>
            <Grid sm={12}>
              <Button style={{ marginLeft: '5px', marginTop: '2%' }} onClick={this.handleClick} > Profil </Button>
            </Grid>
          </div>
          <h2 > Welcome {this.props.login} </h2>
          <img
            style={{ margin: 'auto' }}
            src="https://media.giphy.com/media/eoxomXXVL2S0E/giphy.gif"
            alt="gif"
          />
          <div className="Messages">
            <ul>
              {items.map((x, i) => (
                <li key={i}>
                  <p> {x.message}</p>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={this.submitForm}>
            <div className="x-www-form-urlencoded">
              <label htmlFor="message" className="Textlog">
                {this.props.login} say:{" "}
              </label>
              <Input
                type="text"
                id="message"
                name="message"
                onChange={this.onChange}
                value={this.state.messages}
                required
                style={{ width: "50%" }}
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
}

export default Message;
