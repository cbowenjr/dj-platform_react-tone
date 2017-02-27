import React, { Component } from 'react';
import Tone from 'tone';

class Turntable2 extends Component {
  constructor () {
    super();
    this.state = {
      record:'Choose a Record',
      audio:'none',
      time:0,
      count:0
    }
    this.changeRecord = this.changeRecord.bind(this);
    this.showRecords = this.showRecords.bind(this);
    this.fetchRecord = this.fetchRecord.bind(this);
    this.play = this.play.bind(this);
    this.keepTime = this.keepTime.bind(this)
  }
  fetchRecord(id) {
    let player = new Tone.GrainPlayer({
      "url" : `https://a.clyp.it/rhsf3tcq.mp3`,
      "loop" : true,
      "grainSize" : 0.1,
      "overlap" : 0.05,
    }).toMaster();
    if (player) {
      this.setState({
        audio:player
      })
    }
  }
  changeRecord (record) {
    this.setState({
      record:record.innerText
    })
    document.getElementById('record2UL').classList.remove('show');
    document.getElementById('chooseRecord2').classList.remove('disappear');
    this.fetchRecord(record.title)
  }
  showRecords () {
    document.getElementById('record2UL').classList.add('show');
    document.getElementById('chooseRecord2').classList.add('disappear');
  }
  play () {
    let audio = this.state.audio;
    let playButton = document.getElementById('playButton2');
    if (audio !== 'none' && playButton.innerText === 'START') {
      audio.start("+0.0", `${this.state.count}`);
      playButton.innerText = 'STOP';
      this.setState({
        playing:true
      })
      this.keepTime();
    } else {
      this.setState({
        playing:false
      })
      this.keepTime();
      audio.stop();
      playButton.innerText = 'START';
    }
  }
  keepTime () {
    let count = this.state.count;
    let timer = setInterval(() => {
    if (this.state.playing===true) {
      count=count+1;
      this.setState({
        count:count
      })
    }
    }, 1000);
    if (this.state.playing === false) {
      clearInterval(timer);
    }
  }
  render() {
    return (
      <div>
      <ul className="recordsUL hide" id="record2UL">
         <li className="recordTitles" title="5mfgyypmqj" ref={(list) => {this.list1 = list; }} onClick={() => {this.changeRecord(this.list1) }}>Ice Cube - Check Yo Self 1</li>
        <li className="recordTitles" ref={(list) => {this.list2 = list; }} onClick={() => {this.changeRecord(this.list2) }}>Ice Cube - Check Yo Self 2</li>
        <li className="recordTitles" ref={(list) => {this.list3 = list; }} onClick={() => {this.changeRecord(this.list3) }}>Ice Cube - Check Yo Self 3</li>
        <li className="recordTitles" ref={(list) => {this.list4 = list; }} onClick={() => {this.changeRecord(this.list4) }}>Ice Cube - Check Yo Self 4</li>
        <li className="recordTitles" ref={(list) => {this.list5 = list; }} onClick={() => {this.changeRecord(this.list5) }}>Ice Cube - Check Yo Self 5</li>
        <li className="recordTitles" ref={(list) => {this.list6 = list; }} onClick={() => {this.changeRecord(this.list6) }}>Ice Cube - Check Yo Self 6</li>
        <li className="recordTitles" ref={(list) => {this.list7 = list; }} onClick={() => {this.changeRecord(this.list7) }}>Ice Cube - Check Yo Self 7</li>
        <li className="recordTitles" ref={(list) => {this.list8 = list; }} onClick={() => {this.changeRecord(this.list8) }}>A Tribe Called Quest - Electric Relaxation</li>
      </ul>
        <h2 className="chooseRecord" id="chooseRecord2" onClick={this.showRecords}>{this.state.record}</h2>
        <div className="turnMix">
          <div className="mixer">
            <h3>On 2</h3>
            <div className="filtersContainer">
              <div className="filters" id="record2HP">HP</div>
              <div className="filters" id="record2LP">LP</div>
              <div className="filters" id="record2echo">Echo</div>
            </div>
               <div className="bpmPitch">
              <div>
                <div className="bpmUp" id="record2bpmUp"></div>
                <p>BPM</p>
                <div className="bpmDown" id="record2bpmDown"></div>
              </div>
              <div>
                <div className="pitchUp" id="record2pitchUp"></div>
                <p>PITCH</p>
                <div className="pitchDown" id="record2pitchDown"></div>
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
            <div className="play" id="playButton2" onClick={this.play}>START</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Turntable2;
