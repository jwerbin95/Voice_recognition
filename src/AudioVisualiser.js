import React, { Component } from 'react';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

    draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 7;
    context.clearRect(0, 0, width, height);

    
    for (const item of audioData) {
      const y = (item / 255.0) * 400;
      context.beginPath();
      context.strokeStyle=`rgb(0, ${y+40}, ${x+100})`
      context.arc(width/2, height/2, y+40, 0, Math.PI * 2, true)
      x += sliceWidth;
    }
    context.stroke();
  }


  render() {
    return (
      <div class="container">
        <canvas width="1000" height="1000" ref={this.canvas} />;
        <img src="images/microphone.png" className="mic fixedMic" alt="microphone" />
      </div>
    )
  }
}

export default AudioVisualiser;