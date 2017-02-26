import React, { Component } from 'react';


class Turntable1 extends Component {
  render() {
    return (
      <div>
        <h2 className="chooseRecord2">Choose a Record</h2>
        <div className="turnMix">
          <div className="mixer">
            <h3>On 2</h3>
            <div className="filtersContainer">
              <div className="filters" id="record2HP">HP</div>
              <div className="filters" id="record2LP">LP</div>
              <div className="filters" id="record1echo">Echo</div>
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
              <div className="volumeUp" id="record2gain"></div>
              <p>GAIN</p>
              <div className="volumeDown" id="record2subgain"></div>
            </div>
            <div className="loopRew">
              <div className="rewind" id="record2rewind"></div>
              <div className="loop" id="record2loop"></div>
            </div>
          </div>
          <div className="turntable">
            <div className="play" id="playButton">START</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Turntable1;
