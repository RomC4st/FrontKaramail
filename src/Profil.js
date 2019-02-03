import React, { Component } from 'react';
import Message from './Message';
import Button from '@material-ui/core/Button'
import arrow from "./images/left-arrow.png"
class Profile extends Component {

  state = {

    Back: false,

  }

  BackToMessage = () => {

    this.setState({
      Back: true
    });
  }

  render() {
    if (this.state.Back) {
      return <Message login={this.props.login} />
    }
    return (

      <div className='Profil'>
        <Button name='Back' color='primary' value='Back'
          style={{ marginLeft: '2%', color: '#000' }} onClick={this.BackToMessage}>
          <img className="arrow" src={arrow} alt="back arrow" /> Back
        </Button>
        <div className='MessageProfil'>
          <h1>Message saved :</h1>
        </div></div>
    );
  }
}

export default Profile;