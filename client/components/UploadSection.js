import React from 'react';
import axios from 'axios';
import MatchesUploadSection from './MatchesUploadSection';
import path from 'path';
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

export default class UploadSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            isMatching: false,
            matches: [],
            latitude: 0,
            longitude: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/profile/${localStorage.idTokenPayload}`)
        .then(({data}) => {
          this.setState({latitude: data.latitude})
          this.setState({longitude: data.longitude})
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleInputChange(event){
        event.preventDefault();
        this.setState({input: event.target.value}, () => {
            console.log('This is the state of input: ', this.state.input);
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({input: this.state.input});
        const imageUrl = this.state.input;
        const api = {

            "app_key": '78b2112b369d3016f72b1b5412122197',
            "app_id": '05440b61'

        };
        const body = {
            "image": imageUrl,
            "gallery_name": "SyrupPractice",
            "threshold": .30,
            "max_num_results": 100
        };
        if (this.state.isMatching === false){
            this.setState({isMatching: true});
        }
        axios.post('https://api.kairos.com/recognize', body, {headers: api})
            .then(response => {
                console.log(response.data.images[0].candidates)
                this.setState({matches: response.data.images[0].candidates});
                //take the greater between my latitude/longitude and theirs and subtract lesser from greater to get true distance
                //results we're getting is from kairos, but we should be linking to our database
                //just put their location
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderUploadPic(){
        if(this.state.isMatching){
            return (
                <div>
                    <h3 id="uploading-message">Finding your matches...</h3>
                    <div className="crop">
                        <img src={this.state.input} id="uploaded-pic"/>
                    </div>    
                </div>    
            );
        }
    }

    renderMatchesUploadSection(){
        if(this.state.isMatching){
            return (
                <div>
                    <MatchesUploadSection matches={this.state.matches} history={this.props.history}/>
                </div>        
            );
        }
    }

    render(){
        return(
            <div>
                <div className="intro-header-upload">
                    <div className="container">

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="intro-message">
                                    <h1>Syrup</h1>
                                    <h3>A New Way to Date Online</h3>
                                    <hr className="intro-divider"/>
                                </div>
                            </div>
                            <div>
                        
                            </div>
                            <form className="upload-form">
                                <input onChange={this.handleInputChange} type="text" className="input-lg" placeholder="Enter image url..." />
                                <input onClick={this.handleSubmit} className="button" id="upload-button" type="submit" value="Upload" />
                            </form>
                            {this.renderUploadPic()}
                        </div>
                    </div>
                </div>
                {this.renderMatchesUploadSection()}
            </div>

        );
    }
}