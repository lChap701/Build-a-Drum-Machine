import React from "react";
import {sounds} from "./sounds";
import DrumPad from "./DrumPad";
import {Control} from "./Control";

/* Stateful component */
class Drum extends React.Component {
  constructor(props) {
    super(props);

    // States
    this.state = {
      display: String.fromCharCode(160),
      sliderVal: 0.6
    };

    // Functions
    this.updateDisplay = this.updateDisplay.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  };

  updateDisplay(name) {
    this.setState({
      display: name
    });
    setTimeout(() => this.clearDisplay(), 10000);
  }

  adjustVolume(e) {
    this.setState({
      sliderVal: e.target.value,
      display: "Volume: " + Math.round(e.target.value * 100)
    }); e
    setTimeout(() => this.clearDisplay(), 10000);
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160)
    });
  }

  render() {
    const clips = [...document.getElementsByClassName("clip")];
    clips.forEach(sound => {
      sound.volume = this.state.sliderVal;
    });

    const inputAttr = {
      name: "volume-slider",
      type: "range",
      step: "0.01",
      max: "1",
      min: "0",
      value: this.state.sliderVal
    };

    return (
      <div id="drum-machine">
        <div id="drum-pads">
          {sounds.map((s) => {
            return (
              <DrumPad
                id={s.key.toUpperCase()}
                audio={s.sound}
                audioSrc={s.url}
                volume={this.state.sliderVal}
                updateDisplay={this.updateDisplay}
              />
            );
          })}
        </div>

        <div id="options">
          <div id="display">{this.state.display}</div>

          <Control
            id="volume-slider"
            attributes={inputAttr}
            onChange={this.adjustVolume}
          />
        </div>
      </div>
    );
  }
}

export default Drum;