import React, { Component } from 'react';
import Tone from 'tone';


class Turntable1 extends Component {
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
    this.keepTime = this.keepTime.bind(this);
    this.raiseBMP = this.raiseBMP.bind(this);
    this.lowerBMP = this.lowerBMP.bind(this);
    this.raisePitch = this.raisePitch.bind(this);
    this.lowerPitch = this.lowerPitch.bind(this);
    this.raiseGain = this.raiseGain.bind(this);
    this.lowerGain = this.lowerGain.bind(this);
    this.lowPassFilter = this.lowPassFilter.bind(this);
    this.highPassFilter = this.highPassFilter.bind(this);
    this.delay = this.delay.bind(this);
  }
  fetchRecord(id) {
    let gain = new Tone.Gain({
      "gain" : 1
    }).toMaster();
    let filter = new Tone.Filter({
      "frequency": 200000,
      "type": "bandpass",
      "rolloff" :-96,
      "Q":0,
      "gain":3
    }).toMaster();
    let feedbackDelay = new Tone.PingPongDelay({
      "delayTime" : "8n",
      "feedback" : 0.6,
      "wet" : 0
    }).toMaster();
    let player = new Tone.GrainPlayer({
      "url" : `https://a.clyp.it/rhsf3tcq.mp3`,
      "loop" : true,
      "grainSize" : 0.1,
      "overlap" : 0.05,
    }).chain(gain, filter, feedbackDelay, Tone.Master);
    if (player) {
      this.setState({
        audio:player,
        gain:gain,
        filter:filter,
        delay:feedbackDelay
      })
    }
  }
  changeRecord (record) {
    this.setState({
      record:record.innerText,
      count:0
    })
    document.getElementById('record1UL').classList.remove('show');
    document.getElementById('chooseRecord1').classList.remove('disappear');
    if (this.state.playing === true) {
      this.play();
    }
    this.fetchRecord(record.title)
  }
  showRecords () {
    document.getElementById('record1UL').classList.add('show');
    document.getElementById('chooseRecord1').classList.add('disappear');
  }
  play () {
    let audio = this.state.audio;
    let playButton = document.getElementById('playButton1');
    if (audio !== 'none' && playButton.innerText === 'START') {
      audio.start("+0.1", `${this.state.count}`);
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
  raiseBMP () {
    if (this.state.audio !== 'none') {
      let audio = this.state.audio;
      audio.playbackRate+=.02;
    }
  }
  lowerBMP () {
    if (this.state.audio !== 'none') {
      let audio = this.state.audio;
      audio.playbackRate-=.02;
    }
  }
  raisePitch () {
    if (this.state.audio !== 'none') {
      let audio = this.state.audio;
      audio.detune+=30;
    }
  }
  lowerPitch () {
    if (this.state.audio !== 'none') {
      let audio = this.state.audio;
      audio.detune-=30;
    }
  }
  raiseGain () {
    let gain = this.state.gain;
    if (this.state.audio !== 'none' && gain.gain.value < 2) {
      gain.gain.value+=.1;
       console.log(gain.gain.value);
      this.setState({
        gain:gain
      })
    }
  }
  lowerGain () {
    let gain = this.state.gain;
    if (this.state.audio !== 'none' && gain.gain.value > .05) {
          gain.gain.value-=.1;
          this.setState({
            gain:gain
          })
        }
      }
  lowPassFilter () {
    let filter = this.state.filter;
    if (this.state.audio !== 'none' && filter.type !=='lowpass') {
      filter.type="lowpass";
      filter.frequency.value=200;
      filter.gain.value=4;
      filter.Q.value=1;
    } else if (filter.type ==='lowpass') {
      filter.type="bandpass";
      filter.frequency.value=200000;
      filter.gain.value=3;
      filter.Q.value=0;
    }
  }
  highPassFilter () {
    let filter = this.state.filter;
    if (this.state.audio !== 'none' && filter.type!=='highpass') {
      filter.frequency.value=700;
      filter.type="highpass";
    } else if (filter.type==='highpass') {
        filter.frequency.vaue=200000;
        filter.type="bandpass";

    }
  }
  delay () {
    let gain = this.state.gain;
    if (this.state.audio !== 'none' && gain.gain.value < 2) {
      gain.gain.value+=.1;
       console.log(gain.gain.value);
      this.setState({
        gain:gain
      })
    }
  }
  render() {
    return (
      <div>
      <ul className="recordsUL hide" id="record1UL">
        <li className="recordTitles" title="5mfgyypmqj" ref={(list) => {this.list1 = list; }} onClick={() => {this.changeRecord(this.list1) }}>Ice Cube - Check Yo Self 1</li>
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
            <div className="play" id="playButton1" onClick={this.play}>START</div>
          </div>
          <div className="mixer" id="mixer1">
            <h3>On 1</h3>
            <div className="filtersContainer">
              <div className="filters" id="record1HP" onClick={this.highPassFilter}>HP</div>
              <div className="filters" id="record1LP" onClick={this.lowPassFilter}>LP</div>
              <div className="filters" id="record1delay">Echo</div>
            </div>
            <div className="bpmPitch">
              <div>
                <div className="bpmUp" id="record1bpmUp" onClick={this.raiseBMP}></div>
                <p>BPM</p>
                <div className="bpmDown" id="record1bpmDown" onClick={this.lowerBMP}></div>
              </div>
              <div>
                <div className="pitchUp" id="record1pitchUp" onClick={this.raisePitch}></div>
                <p>PITCH</p>
                <div className="pitchDown" id="record1pitchDown" onClick={this.lowerPitch}></div>
            </div>
            </div>
            <div className="gain">
              <div className="volumeUp" id="record1gain" onClick={this.raiseGain}></div>
              <p>GAIN</p>
              <div className="volumeDown" id="record1subgain" onClick={this.lowerGain}></div>
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
