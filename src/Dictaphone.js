import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import PropTypes from 'prop-types'

//****************************************************************************
// These props are injected by the Speech Recognition component
const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}
//****************************************************************************

//****************************************************************************
//Speech Recognition Component
class Dictaphone extends Component {
  //****************************************************************************
  //Tests the transcript when the user speaks, tests localhost:3000 DB against commands
  testTranscript(){
      let testScript = this.props.finalTranscript.split(" ")
      //Check if spoken input is a google search
      if(testScript[0].toLowerCase()==="google"){
        testScript.shift()
        let urlString = ""
        testScript.map(function(item){
          urlString+=item+'+'
          return item
        })
        urlString.slice(0, -1)
        window.location.assign(`https://www.google.com/search?ei=EcaHXIXpF8PKswXV8JiQDQ&q=${urlString}&oq=${urlString}&gs_l=psy-ab.3..0l3j0i30l5j0i5i30j0i8i10i30.18609.18983..19185...0.0..0.171.494.2j2......0....1..gws-wiz.......0i71j0i7i30j0i8i7i10i30.L95Y-uyZKpM`)
      //Tests if spoken input is 'add website'
      }else if(this.props.finalTranscript.toLowerCase()==='add website' ){
        this.props.resetTranscript()
        this.props.toggleMicrophone()
        this.props.checkForm()
      }
      //Tests if spoken input is 'remove'
      else if(testScript[0].toLowerCase()==='remove'){
        this.props.resetTranscript()
        testScript.shift()
        let removeString = testScript.join(" ")
        console.log(removeString)
        fetch('http://localhost:3000/remove', {
          method: 'delete',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            name: removeString
          })
        })
      }
      //Case for all other spoken input
      else{
        fetch("http://localhost:3000/command/"+this.props.finalTranscript.toLowerCase()).then(data=>{
          this.props.resetTranscript()
          data.json().then(jsonData=>{
            window.location.assign(jsonData[0].value)
          })
            .catch(error=>{
              this.props.resetTranscript()
              this.props.toggleMicrophone()
            })
          
        }).catch(error=>{
          console.log(error.stack)
          this.props.resetTranscript()
        })
      }
    }
  //****************************************************************************

  //****************************************************************************
  //Render
  render() {
    //Test to see if the user has spoken, without this the render would repeatedly call testTranscript()
    if(this.props.interimTranscript==='' && this.props.finalTranscript!=='' && this.props.listening){ 
        this.testTranscript()
    }
    //Speech recognition props
    const { browserSupportsSpeechRecognition, interimTranscript} = this.props
    //Check if browser supports react-speech-recognition
    if (!browserSupportsSpeechRecognition) {
      return null
    }
    return (
      //Spoken words displayed
      <div className="transcriptContainer">
        <div className="transcript">{interimTranscript}</div>
      </div>
    )
  }
  //****************************************************************************
}

Dictaphone.propTypes = propTypes

export default SpeechRecognition(Dictaphone)