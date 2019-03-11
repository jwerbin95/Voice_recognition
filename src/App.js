import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import Dictaphone from './Dictaphone'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      message: ''
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.setMessage = this.setMessage.bind(this)
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  setMessage(newMessage){
    this.setState({
      message: newMessage
    })
  }
  
  show(){
    return(
      <div>
        <AudioAnalyser audio={this.state.audio} />
        <Dictaphone toggleMicrophone={this.toggleMicrophone} setMessage={this.setMessage}/>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <div class='transcriptContainer'>
          <span className="transcript">{this.state.message}</span>
        </div>
        {this.state.audio ? this.show() : <img className="mic" src="images/microphone.png" onClick={this.toggleMicrophone} />}
      </div>
    );
  }
}

export default App;