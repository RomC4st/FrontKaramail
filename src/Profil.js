import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import Button from '@material-ui/core/Button';
import arrow from './images/left-arrow.png';
import Edit from './images/edit_black_27x27.png'
import Delete from './images/delete_black_27x27.png'

class Profile extends Component {

  state = {
    Back: false,
    token: undefined,
    data: [],
    isLoading: false,
    page: null,
    idMessage: null,
    prevData: [],
    id: this.props.id,
    login: this.props.login
  }

  BackToMessage = () => {
    this.setState({
      Back: true
    });
  }

  handleClick = (e) => {
    console.log('CRS 1', this.state.prevData)
    e.preventDefault();
    this.setState({
      action: e.currentTarget.value,
      idMessage: e.currentTarget.getAttribute('name'),

    }, () => {
      if (this.state.action === 'delete')
        axios.delete(`http://localhost:3001/messages/${this.state.idMessage}`)
      axios(`http://localhost:3001/messages/${this.state.id}`)
        .then(res => {
          this.setState({
            prevData: res.data
          })
        })
    })
    console.log('CRS 2', this.state.prevData)
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
    this.getData()
  }

  getData = () => {
    let url = `http://localhost:3001/messages/${this.state.id}`
    axios(url)
      .then(res => this.setState({
        token: localStorage.getItem("KaraToken"),
        data: res.data,
        prevData: res.data,
        isLoading: true,
        page: 1,
      }))
  }


  componentDidUpdate = () => {

    if (this.state.prevData !== this.state.data) {
      this.getData()
    }
  }

  render() {
    console.log('DATA', this.state.data,
      'PREVDATA', this.state.prevData)

    if (this.state.data === [])
      return <h1>No messages to show</h1>
    if (this.state.Loaded === false) {
      return <h1>is Loading...</h1>
    }
    if (this.state.Back) {
      return <Message login={this.state.login} />
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
          <h1>{this.state.data.length} Messages from {this.state.login} saved </h1>
          <ul style={{ textAlign: 'center' }}>
            {this.state.data
              .slice((this.state.page - 1) * 10, this.state.page * 10)
              .map((e, i) => (
                <li key={i}>
                  <p > {e.message.split(`${this.state.login}:`)}
                    <Button color='primary' name={e.id} value='edit'
                      style={{ marginLeft: '2%', color: '#000' }} onClick={this.handleClick}>
                      <img src={Edit} alt="update" />
                    </Button>
                    <Button color='primary' name={e.id} value='delete'
                      style={{ marginLeft: '2%', color: '#000' }} onClick={this.handleClick}>
                      <img src={Delete} alt="delete" />
                    </Button>
                  </p>
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