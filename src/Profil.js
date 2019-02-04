import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import Button from '@material-ui/core/Button';
import arrow from './images/left-arrow.png';


class Profile extends Component {

  state = {
    Back: false,
    token: undefined,
    data: [],
    isLoading: false
  }

  BackToMessage = () => {

    this.setState({
      Back: true
    });
  }
  componentDidMount = () => {
    let url = `http://localhost:3001/messages/${this.props.id}`
    axios(url)
      .then(res => this.setState({
        token: localStorage.getItem("KaraToken"),
        data: res.data,
        isLoading: true
      }))


  }
  render() {
    if (this.state.Loaded === false) {
      return <h1>is Loading...</h1>
    }
    if (this.state.Back) {
      return <Message login={this.props.login} />
    }
    if (this.state.token === null) {
      return <h1 style={{
        textAlign: 'center'
      }}>Access Denied</h1>
    }
    return (

      <div className='Profil'>
        <Button name='Back' color='primary' value='Back'
          style={{ marginLeft: '2%', color: '#000' }} onClick={this.BackToMessage}>
          <img className="arrow" src={arrow} alt="back arrow" /> Back
        </Button>

        <div className='MessageProfil'>
          <h1>Message saved : {this.props.id}</h1>
          <ul style={{ textAlign: 'center' }}>
            {this.state.data.map((e, i) => (
              <li key={i}>
                <p > {e.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}


export default Profile;