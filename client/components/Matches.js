import React from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import MatchesResults from './MatchesResults';
import io from 'socket.io-client';

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.testButtonOn = this.testButtonOn.bind(this);
    this.state = {
      authId: localStorage.idTokenPayload,
      matches: [],
      userId: null
    }
  }

  componentDidMount(){
    axios.get(`/api/user/${this.state.authId}`)
      .then(({ data }) => {
        this.setState({ userId: data.id })
        axios.get(`/api/matches/${data.id}`)
          .then(data => {
            this.setState({matches: data.data});
            console.log('MATCHES', this.state.matches);
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  testing() {
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GEO_API_KEY}`)
    .then(response => {
      console.log(response.data.location)
    })
    .catch(err => { if (err) {return console.error(err)} })
  }

  testButtonOn() {
    let socket = this.state.socket;
    socket.emit('new-match', function(data) {
    console.log('message emitted');
    })
  }

  render() {
    console.log(Map)
    return (
      <div className="intro-message">
        <NavBar />
        <MatchesResults matches={this.state.matches} history={this.props.history} userId={this.state.userId} />
      </div>
    );
  }
}

