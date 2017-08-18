import React, { Component } from 'react';
import NavBar from './NavBar';

class VideoChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      number: ''
    }
    this.login = this.login.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
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
	    number        : this.state.username || "Anonymous", // listen on username line else Anonymous
	    publish_key   : 'pub-c-f2176993-288c-4e3b-b885-c7d2439409d3',
	    subscribe_key : 'sub-c-5489ae3c-8375-11e7-9034-1e9edc6dd7f6',
    });	
    // phone.ready(function(){ form.username.style.background="#55ff5b"; });
    phone.receive(function(session){
        session.connected(function(session) { video_out.appendChild(session.video); });
        session.ended(function(session) { video_out.innerHTML=''; });
    });
    return false; 	// So the form does not submit.
  }

  makeCall(e) {
    e.preventDefault();
    if (!window.phone) alert("Enter your name first!");
    else phone.dial(this.state.number);
    return false;
  }

  render() {
    return (
			<div className="intro-message">

				<NavBar />

        <form name="loginForm" id="login" action="#" onSubmit={this.login}>
            <input type="text" name="username" id="username" placeholder="Pick a username!" onChange={this.handleUsername} />
            <input type="submit" name="login_submit" value="Your Name!" />
        </form>

        <form name="callForm" id="call" action="#" onSubmit={this.makeCall}>
          <input type="text" name="number" placeholder="Enter partner's name!" onChange={this.handleNumber} />
          <input type="submit" value="Call"/>
        </form>

        <div id="vid-box"></div>

      </div>
    );
  }
}

export default VideoChat;