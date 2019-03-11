import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import PropTypes from 'prop-types'

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Dictaphone extends Component {
  testTranscript(){
      console.log(this.props.finalTranscript)
      fetch("http://localhost:3000/command/"+this.props.finalTranscript.toLowerCase()).then(data=>{
        this.props.resetTranscript()
        data.json().then(jsonData=>{
          window.location.assign(jsonData[0].value)
        })
          .catch(error=>{
            this.props.toggleMicrophone()
            this.props.setMessage("Command not found.")
            setTimeout(function(){
              this.props.setMessage("")
            }.bind(this), 3000)
          })
        
      }).catch(error=>{
        console.log(error.stack)
        this.props.resetTranscript()
      })
    }

  render() {
    const { transcript, browserSupportsSpeechRecognition, finalTranscript, interimTranscript} = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    return (
      <div className="transcriptContainer">
        <div className="transcript">
          {interimTranscript}
        </div>
        {interimTranscript==='' && finalTranscript!=='' ? this.testTranscript(): null}
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

export default SpeechRecognition(Dictaphone)