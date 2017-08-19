import React from 'react';
import MessageBox from './MessageBox';
import NavBar from '../NavBar';
import MatchList from './MatchList';
import SocketIsockOClient from 'socket.io-client';
import axios from 'axios';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: '',
      firstnames: [],
      firstname: '',
      matcheeIds: [],
      myname:'',
      userId: null
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSend = this.handleOnSend.bind(this);
    this.handleMatchClick = this.handleMatchClick.bind(this);
  }
  componentDidMount(){
    this.socket = io('/')
    this.socket.on('chat message', data => {
      this.setState({
          messages: [...this.state.messages, data],
        })
    })
      axios.get(`/api/matches/${localStorage.idTokenPayload}`)
      .then(({data}) => {
        for (let i = 0; i < data.length; i++) {
          this.setState({
            matcheeIds: [...this.state.matcheeIds, Number(data[i]['matcheeId'])]
          })
        }
      })
      .then(() => {
        for (let j = 0; j < this.state.matcheeIds.length; j++) {
          axios.get(`/api/profile/${this.state.matcheeIds[j]}`)
            .then(({data}) => {
              
              this.setState({
                firstnames: [...this.state.firstnames, data.firstname]
              })
            })
        }
      })

    this.socket.emit('message-viewed', function(data) {
      console.log(data);
    })
  }
  handleOnChange(e){
    this.setState({
      text: e.target.value
    })
  }

  handleOnSend(e){
    e.preventDefault();
    this.socket.emit('send message', this.state.text)
    axios.get(`/api/users/${this.state.firstname}`)
    .then(data => {
      this.setState({
        userId: Number(data.data[0].id)
      })
    })
    .then(() => {
      axios.post(`/api/message/${localStorage.idTokenPayload}/${this.state.userId}`, {
        text: this.state.text
      })
    })
    .then(() => {
      this.setState({
        text: ''
      })
    })
  }

  
 handleMatchClick(i){
    let name = this.state.firstnames[i]
    this.setState({
      firstname: name,
      messages:[]
    }, () => {
      axios.get(`/api/users/${name}`)
      .then(({data}) => {
        let id = Number(data[0].id)
        axios.get(`/api/message/${localStorage.idTokenPayload}/${id}`)
        .then(({data}) => {
          for (let i = 0; i < data.length; i++) {         
          this.setState({
            messages: [...this.state.messages, data[i].text]
          })
        }}) 
      })
    })
  }

  render() {
    return (
      <div className="intro-message">
        <NavBar />
        <div className="chatbox">
          <div className="chatList">
            <MatchList firstnames={this.state.firstnames} handleMatchClick={this.handleMatchClick}/>
          </div>
          <div className="message-box">
            <MessageBox messages={this.state.messages} firstname={this.state.firstname} handleMatchClick={this.handleMatchClick} myname={this.state.myname}/>
            <div>
              <form className="message-form">
                <input name="message" value={this.state.text} onChange={this.handleOnChange}/>
                <button onClick={this.handleOnSend}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}