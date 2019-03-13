import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import Dictaphone from './Dictaphone'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      message: '',
      showForm: false,
      command: "",
      url: "",
      commandList: null
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.setMessage = this.setMessage.bind(this)
    this.checkForm = this.checkForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchCommands = this.fetchCommands.bind(this)
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
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

  checkForm(){
    this.setState({
      showForm: true
    })
  }
  
  show(){
    return(
      <div>
        <AudioAnalyser audio={this.state.audio} />
        <Dictaphone 
          toggleMicrophone={this.toggleMicrophone} 
          setMessage={this.setMessage} 
          checkForm={this.checkForm}
        />
      </div>
    )
  }
  handleSubmit(event){
    event.preventDefault()
    fetch("http://localhost:3000/command", {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name: this.state.command,
        value: this.state.url
      })
    }).then(data=>{
      console.log(data)
      console.log("Sucessfully send post request to API.")
      this.fetchCommands()
    }).catch(error=>{
      console.log(error.stack)
    })
  }
  handleChange(event){
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  fetchCommands(){
    fetch("http://localhost:3000/commands").then(data=>{
          data.json().then(jsonData=>{
            this.setState({
              commandList: jsonData
            })
          }).catch(error=>{
            console.log(error.stack)
          })
        }).catch(error=>{
          console.log(error.stack)
        })
  }
  componentDidUpdate(){
    this.fetchCommands()
  }
  render() {
    let list = null
    if(this.state.commandList!==null){
      list = this.state.commandList.map(item=>{
        return (
          <div role="listitem" class="item">
            <div class="content">
              <div class='header'>Say: {item.name} </div>
              <div>Redirects To: {item.value}</div>
            </div>
          </div>
        )
      })
    }
    return (
      <div className="App">
        <div className='transcriptContainer'>
          <span className="transcript">{this.state.message}</span>
        </div>
        {this.state.commandList!==null ? (
          <div className='ui inverted segment'>
            <div className='ui medium header'>Available Commands</div>
            <div role='list' class="ui divided inverted relaxed list">
              {list}
              <div role="listitem" class="item">
                <div class="content">
                  <div class='header'>Say: add website </div>
                  <div>Add A Command</div>
                </div>
              </div>
              <div role="listitem" class="item">
                <div class="content">
                  <div class='header'>Say: google (whatever you want to search) </div>
                  <div>Search Google</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {
          this.state.audio ? 
          this.show() : 
            <div>
              <div className='ui huge white inverted center aligned header'>Click Microphone To Begin</div>
              <img 
                className="mic" 
                src="images/microphone.png" 
                onClick={this.toggleMicrophone} 
                alt="click to use voice commands"
              />
            </div>
        }
        {this.state.showForm ? (
          <form onSubmit={this.handleSubmit} className="ui form">
            <div className="field">
              <span className="formLabel">Command Name:</span>
              <input className="inputField" type="text" name="command" placeholder="Take Me To Google..." value={this.state.command} onChange={this.handleChange}/>
            </div>
            <div className="field">
              <span className="formLabel" name="url">URL:</span>
              <input className="inputField" type="text" name="url" placeholder="https://www.google.com/..." value={this.state.url} onChange={this.handleChange}/>
            </div>
            <input className="ui button" type="submit" value="Save" />
          </form>
        ) : null}
      </div>
    );
  }
}

export default App;