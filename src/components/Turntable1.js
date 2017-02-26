import React, { Component } from 'react';


class Turntable1 extends Component {
  constructor () {
    super();
    this.state = {
      record:'Choose a Record'
    }
    this.changeRecord = this.changeRecord.bind(this);
    this.showRecords = this.showRecords.bind(this);
  }
  changeRecord (record) {
    this.setState({
      record:record.innerText
    })
    document.getElementById('record1UL').classList.remove('show');
    document.getElementById('chooseRecord1').classList.remove('disappear');
  }
  showRecords () {
    document.getElementById('record1UL').classList.add('show');
    document.getElementById('chooseRecord1').classList.add('disappear');
  }
  render() {
    return (
      <div>
      <ul className="recordsUL hide" id="record1UL">
        <li className="recordTitles" ref={(list) => {this.list1 = list; }} onClick={() => {this.changeRecord(this.list1) }}>Ice Cube - Check Yo Self 1</li>
        <li className="recordTitles" ref={(list) => {this.list2 = list; }} onClick={() => {this.changeRecord(this.list2) }}>Ice Cube - Check Yo Self 2</li>
        <li className="recordTitles" ref={(list) => {this.list3 = list; }} onClick={() => {this.changeRecord(this.list3) }}>Ice Cube - Check Yo Self 3</li>
        <li className="recordTitles" ref={(list) => {this.list4 = list; }} onClick={() => {this.changeRecord(this.list4) }}>Ice Cube - Check Yo Self 4</li>
        <li className="recordTitles" ref={(list) => {this.list5 = list; }} onClick={() => {this.changeRecord(this.list5) }}>Ice Cube - Check Yo Self 5</li>
        <li className="recordTitles" ref={(list) => {this.list6 = list; }} onClick={() => {this.changeRecord(this.list6) }}>Ice Cube - Check Yo Self 6</li>
        <li className="recordTitles" ref={(list) => {this.list7 = list; }} onClick={() => {this.changeRecord(this.list7) }}>Ice Cube - Check Yo Self 7</li>
        <li className="recordTitles" ref={(list) => {this.list8 = list; }} onClick={() => {this.changeRecord(this.list8) }}>A Tribe Called Quest - Electric Relaxation</li>
      </ul>
        <h2 className="chooseRecord" id="chooseRecord1" onClick={this.showRecords}>{this.state.record}</h2>
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
