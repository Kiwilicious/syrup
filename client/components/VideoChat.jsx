import React, { Component } from 'react';
import NavBar from './NavBar';
import io from 'socket.io-client';


class VideoChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authId: localStorage.idTokenPayload,
      username: '',
      number: '',
      user: this.props.match.params.userId,
      match: this.props.match.params.matchId
    }
    this.makeCall = this.makeCall.bind(this);
    this.endCall = this.endCall.bind(this);
  }

  componentDidMount() {
    const socket = io();
    socket.emit('videochat-viewed', function(data) {
      console.log(data);
    })
  }

  handleUsername(e) {
    e.preventDefault();
    this.setState({username: e.target.value})
  }

  handleNumber(e) {
    e.preventDefault();
    this.setState({number: e.target.value})
  }

  login(form) {
    form.preventDefault();
    var video_out = document.getElementById("vid-box");
    var phone = window.phone = PHONE({
	    number        : this.state.user,
	    publish_key   : 'pub-c-f2176993-288c-4e3b-b885-c7d2439409d3',
	    subscribe_key : 'sub-c-5489ae3c-8375-11e7-9034-1e9edc6dd7f6',
    });	
    // phone.ready(function(){ form.username.style.background="#55ff5b"; });
    phone.receive(function(session){
        session.connected(function(session) { video_out.appendChild(session.video); });
        session.ended(function(session) { video_out.innerHTML=''; });
    });
  }

  makeCall(e) {
    e.preventDefault();
    if (!window.phone) alert("Enter your name first!");
    else phone.dial(this.state.match);
  }

  endCall() {
    var ctrl = window.ctrl = CONTROLLER(phone);
    ctrl.hangup();
  }

  render() {
    return (
			<div className="intro-message">

				<NavBar />

        <div id="vid-box"></div>
        <div className="btn-holder">
          <button className="startBtn" onClick={this.makeCall}>Start call</button>
          <button className="stopBtn" onClick={this.endCall}>End call</button>
        </div>
        
      </div>
    );
  }
}

export default VideoChat;