import React, { Component } from 'react';


class Turntable1 extends Component {
  render() {
    return (
      <div>
        <h2 className="chooseRecord">Choose a Record</h2>
        <div className="turnMix">
          <div className="turntable">
            <div className="play" id="playButton">START</div>
          </div>
          <div className="mixer" id="mixer1">
            <h3>On 1</h3>
            <div className="filtersContainer">
              <div className="filters" id="record1HP">HP</div>
              <div className="filters" id="record1LP">LP</div>
              <div className="filters" id="record1delay">Echo</div>
            </div>
            <div className="bpmPitch">
              <div>
                <div className="bpmUp" id="record1bpmUp"></div>
                <p>BPM</p>
                <div className="bpmDown" id="record1bpmDown"></div>
              </div>
              <div>
                <div className="pitchUp" id="record1pitchUp"></div>
                <p>PITCH</p>
                <div className="pitchDown" id="record1pitchDown"></div>
            </div>
            </div>
            <div className="gain">
              <div className="volumeUp" id="record1gain"></div>
              <p>GAIN</p>
              <div className="volumeDown" id="record1subgain"></div>
            </div>
            <div className="loopRew">
              <div className="rewind" id="record1rewind"></div>
              <div className="loop" id="record1loop"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Turntable1;
