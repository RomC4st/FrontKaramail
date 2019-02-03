import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

class NavBar extends Component {
  state = {
    ButtonClick: null
  }

  handleClick = e => {
    this.setState({
      ButtonClick: e.currentTarget.value
    })
  }
  render() {
    if (this.state.ButtonClick === '1') {
      return <Redirect to='/signin' />
    }
    if (this.state.ButtonClick === '2') {
      return <Redirect to='/signup' />
    }
    return (<div className="navbar" style={{ alignItems: 'center', display: 'flex' }}>
      <Button
        className="navBar"
        style={{ padding: '1%' }}
        value='1'
        variant="contained"
        color="primary"
        onClick={this.handleClick}
      >SignIn
      </Button>
      <Button
        className="navBar"
        style={{ padding: '1%' }}
        value='2'
        variant="contained"
        color="secondary"
        onClick={this.handleClick}
      >SignUp
      </Button>
    </div>);
  }
}

export default NavBar;