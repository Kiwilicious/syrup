import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from 'auth0-js';
import socket from 'socket.io';

class NavBar extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    // this.matchNotification = this.matchNotification.bind(this);
    // this.messageNotification = this.messageNotification.bind(this);
    // this.chatNotification = this.chatNotification.bind(this);
    // this.matchViewed = this.matchViewed.bind(this);
    // this.messageViewed = this.messageViewed.bind(this);
    // this.chatViewed = this.chatViewed.bind(this);
    this.state = {
      // newMatch: true,
      // newMessage: true,
      // newChat: true
    }
  }
  
  logout(auth) {
    console.log('youre in logout')
    auth.logout();
  }

  // handleChange(key){
  //   this.setState({[key] : !this.state[key]});
  // }
  
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
              <li><img src="http://flyosity.com/images/_blogentries/networkicon/step1.png" height="15" width="15"/></li>
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

export default NavBar;
