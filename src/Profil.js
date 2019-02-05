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
    isLoading: false,
    page: null
  }

  BackToMessage = () => {

    this.setState({
      Back: true
    });
  }

  next = () => {
    if (this.state.page >= this.state.data.length / 10)
      return this.state.page
    else
      return this.setState({ page: this.state.page + 1 });
  };

  prev = () => {
    if (this.state.page === 1 || this.state.page === null)
      return this.state.page;
    else
      return this.setState({ page: this.state.page - 1 });
  };

  componentDidMount = () => {
    let url = `http://localhost:3001/messages/${this.props.id}`
    axios(url)
      .then(res => this.setState({
        token: localStorage.getItem("KaraToken"),
        data: res.data,
        isLoading: true,
        page: 1
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
          <h1>{this.state.data.length} Messages from {this.props.login} saved </h1>
          <ul style={{ textAlign: 'center' }}>
            {this.state.data
              .slice((this.state.page - 1) * 10, this.state.page * 10)
              .map((e, i) => (
                <li key={i}>
                  <p > {e.message.split(`${this.props.login}:`)}</p>
                </li>
              ))}
            <div className='Pagination'>
              <li>
                <Button className="Prev" onClick={this.prev}>prev</Button>
              </li>
              <li>
                <p className="CountPage">{this.state.page}</p>
              </li>
              <li>
                <Button className="Next" onClick={this.next}>
                  next
                </Button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}


export default Profile;