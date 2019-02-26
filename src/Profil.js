import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import Button from '@material-ui/core/Button';
import arrow from './images/left-arrow.png';
import Edit from './images/edit_black_27x27.png';
import Delete from './images/delete_black_27x27.png';
import Input from '@material-ui/core/Input';
import Confirm from './images/done_black_27x27.png';
import Cancel from './images/cancel_black_27x27.png'


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
    login: this.props.login,
    prevAction: null,
    action: null
  }

  BackToMessage = () => {
    this.setState({
      Back: true
    });
  }

  handleClick = async (e) => {

    e.preventDefault();
    this.setState(prevState => ({
      prevAction: prevState.action
    }))
    const ACTION = await

      this.setState({
        action: e.currentTarget.value,
        idMessage: e.currentTarget.getAttribute('name'),

      }, () => {
        if (this.state.action === 'delete') {
          axios.delete(`http://localhost:3001/messages/${this.state.idMessage}`)
          axios(`http://localhost:3001/messages/${this.state.id}`)
            .then(res => {
              this.setState({
                prevData: res.data
              })
            })
        } else if (this.state.action === 'confirm') {

          if (this.state[this.state.idMessage]) {
            const config = { message: `${this.state.login}: ` + this.state[this.state.idMessage].toString() }
            const url = `http://localhost:3001/messages/${this.state.idMessage}`
            axios.put(url, config)
              .then(res => this.setState({
                prevData: res.data
              }))
          } else {
            return alert(`You didn't change anything !`)
          }
        } else if (this.state.action === 'cancel') {

          this.state.data.map(el => {
            if (el.id === this.state.idMessage) {
              this.setState({
                [el.id]: el.message
              })
            }
            return 1
          })
        }
       else if (this.state.prevAction === 'edit' && this.state.action === 'edit') {
          
          this.state.data.map(el => {
            if(this.state[el.id]) {
               this.setState({
                 [el.id]: el.message.split(`${this.state.login}: `).slice(1)
                  })    
            }
            return 1
           })
         }
       })
     return ACTION
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

  onChange = e => {
    
    this.setState({
      [e.target.getAttribute('name')]: e.target.value.split(`${this.state.login}: `).filter(e => e.length > 0)
    }, () => {
      console.table(this.state)
    })
  }

  componentDidUpdate = () => {
    if (this.state.prevData !== this.state.data) {
      this.getData()
    }
  }

  render() {
    console.table(this.state)
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

                <li key={i} style={{ display: 'flex', justifyContent: 'center' }}>

                  {(this.state.action === 'edit') && (this.state.idMessage === `${e.id}`)
                    ? <Input name={e.id.toString()} value={this.state[e.id] ? this.state[e.id] : e.message} onChange={this.onChange} />
                    : <p> {e.message.split(`${this.state.login}:`)}</p>}


                  {(this.state.action === 'edit') && (this.state.idMessage === `${e.id}`)
                    ? <Button color='primary' name={e.id} value='confirm'
                      style={{ marginLeft: '2%', color: '#000' }} onClick={this.handleClick}>
                      <img src={Confirm} alt="confirm" />
                    </Button>

                    : <Button color='primary' name={e.id} value='edit'
                      style={{ marginLeft: '2%', color: '#000' }} onClick={this.handleClick}>
                      <img src={Edit} alt="edit" />
                    </Button>}

                  {(this.state.action === 'edit') && (this.state.idMessage === `${e.id}`)

                    ? <Button color='primary' name={e.id} value='cancel'
                      style={{ marginLeft: '2%', color: '#000' }} onClick={this.handleClick}>
                      <img src={Cancel} alt="cancel" />
                    </Button>

                    : <Button color='primary' name={e.id} value='delete'
                      style={{ marginLeft: '2%', color: '#000' }} onClick={this.handleClick}>
                      <img src={Delete} alt="delete" />
                    </Button>}

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