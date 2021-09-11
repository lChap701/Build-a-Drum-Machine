import React from "react";
import {active, inactive} from "./styles";

/* Stateful component */
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    
    // States
    this.state = {
      padStyle: inactive
    };
    
    // Functions
    this.keyPressed = this.keyPressed.bind(this);
    this.playSound = this.playSound.bind(this);
    this.activatePad = this.activatePad.bind(this);
    
    // Event listener
    document.addEventListener("keydown", this.keyPressed);
  }
  
  keyPressed(e) {
    if (e.key.toUpperCase() === this.props.id) {
      this.playSound();
    }
  }
  
  playSound() {
    const sound = document.getElementById(this.props.id);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 120);
    this.props.updateDisplay(this.props.audio);
  }
  
  /*componentWillMount() {
    document.addEventListener("keydown", this.keyPressed);
  }*/
  
  activatePad() {
    if (this.state.padStyle.backgroundColor !== inactive.backgroundColor) {
      this.setState({
        padStyle: inactive
      })
    } else {
      this.setState({
        padStyle: active
      })
    }
  }
  
  render() {
    const ID = this.props.audio.replace(/\s+/g, "-"); 
    return (
      <button 
        className="drum-pad" 
        id={ID}
        style={this.state.padStyle}
        onClick={this.playSound}
      >
        <audio 
          id={this.props.id} 
          className="clip" 
          src={this.props.audioSrc}
        ></audio>
        {this.props.id}
      </button>
    );
  }
}

export default DrumPad;