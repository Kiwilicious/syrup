import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from 'auth0-js';
import io from 'socket.io-client';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
    matchNotification: state.matchNotificationReducer.matchNotification,
    messageNotification: state.messageNotificationReducer.messageNotification,
    videoChatNotification: state.videoChatNotificationReducer.videoChatNotification,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMatchNotification(isTrue) {
			dispatch({
				type: 'SET_MATCH',
				payload: isTrue
			})
    },
    setMessageNotification(isTrue) {
			dispatch({
				type: 'SET_MESSAGE',
				payload: isTrue
			})
    },
    setVideoChatNotification(isTrue) {
			dispatch({
				type: 'SET_VIDEOCHAT',
				payload: isTrue
			})
		}
  }
  
}

class NavBar extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.matchNotification = this.matchNotification.bind(this);
    this.messageNotification = this.messageNotification.bind(this);
    this.videoChatNotification = this.videoChatNotification.bind(this);
    this.matchViewed = this.matchViewed.bind(this);
    this.messageViewed = this.messageViewed.bind(this);
    this.videoChatViewed = this.videoChatViewed.bind(this);
    this.testButtonOn = this.testButtonOn.bind(this);
    this.testButtonOff = this.testButtonOff.bind(this);
    this.state = {
      socket: null
    }
  }

  componentDidMount() {
    const socket = io();
    this.setState({socket: socket});
    socket.on('newMatch', this.matchNotification);
    socket.on('newMessage', this.messageNotification);
    socket.on('newVideoChat', this.videoChatNotification);
    //eventally change the bottom 3 to set state to false without going through the server
    socket.on('matchViewed', this.matchViewed);
    socket.on('messageViewed', this.messageViewed);
    socket.on('videoChatViewed', this.videoChatViewed);
  }

  testButtonOn() {
    this.state.socket.emit('new-message', function(data) {
      console.log(data);
    })
  }

  testButtonOff() {
    this.state.socket.emit('message-viewed', function(data) {
      console.log(data);
    })
  }

  matchNotification() {
    console.log('set notification to true')
    this.props.setMatchNotification(true);
  }

  messageNotification() {
    this.props.setMessageNotification(true);
  }

  videoChatNotification() {
    this.props.setVideoChatNotification(true);
  }

  matchViewed() {
    console.log('match is trying to turn off')
    this.props.setMatchNotification(false);
  }

  messageViewed() {
    this.props.setMessageNotification(false);
  }

  videoChatViewed() {
    this.props.setVideoChatNotification(false);
  }

  logout(auth) {
    console.log('youre in logout')
    auth.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
      <div className="container topnav">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand topnav" to='/'><img id="brand-image" src="https://files.slack.com/files-pri/T2SV1LBC6-F6PA047N2/syrup_logo.png"/></Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">

              {/* {this.state.newMatches ?
              <li className="new-matches" ><img src="http://flyosity.com/images/_blogentries/networkicon/step1.png" height="15" width="15"/></li> 
              : null} */}
              <li><Link to='/matches'>Matches</Link></li>
              {/* {this.state.newMessages ?
              <li className="new-messages"><img src="http://flyosity.com/images/_blogentries/networkicon/step1.png" height="15" width="15"/></li>
              : null} */}

              <li><Link to='/messages'>Messages</Link></li>
              {this.props.videoChatNotification ?
              <li className="new-videochat"><img src="http://flyosity.com/images/_blogentries/networkicon/step1.png" height="15" width="15"/></li>
              : null}
              <li><Link to='/videochat'>Video Chat</Link></li>
              <li><Link to='/upload'>Upload</Link></li>
              <li><Link to='/profile'>Profile</Link></li>
              <li><a onClick={() => this.logout(this.props.auth)} style={{cursor:'pointer'}}>Log Out</a></li>
            </ul>
          </div>
      </div>
  </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
