import React, { Component } from 'react';
import Tone from 'tone';

class Turntable2 extends Component {
  constructor () {
    super();
    this.state = {
      record:'Choose a Record',
      audio:'none',
      time:0,
      count:0,
      reverse:false,
      forward:false
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
    this.reverse = this.reverse.bind(this);
    this.forward = this.forward.bind(this);
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
    let feedbackDelay = new Tone.FeedbackDelay({
      "delayTime" : "0.25",
      "feedback" : 0.5,
      "wet" : 0
    }).toMaster();
    let player = new Tone.GrainPlayer({
      "url" : `http://k003.kiwi6.com/hotlink/${id}.mp3`,
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
    document.getElementById('record2UL').classList.remove('show');
    document.getElementById('chooseRecord2').classList.remove('disappear');
    if (this.state.playing === true) {
      this.play();
    }
    this.fetchRecord(record.title);
    document.getElementById('recordSpin2').classList.remove('hide');
    document.getElementById('recordImg2').style.backgroundImage=`url(${record.id})`;
  }
  showRecords () {
    document.getElementById('record2UL').classList.add('show');
    document.getElementById('chooseRecord2').classList.add('disappear');
  }
  play () {
    let audio = this.state.audio;
    let playButton = document.getElementById('playButton2');
    if (audio !== 'none' && playButton.innerText === 'START') {
      this.setState({
        playing:true
      })
      document.getElementById('recordSpin2').classList.add('recordSpinActive');
      audio.start("+0.1", `${this.state.count}`);
      playButton.innerText = 'STOP';
      this.keepTime();
    } else {
      this.setState({
        playing:false
      })
      this.keepTime();
      audio.stop();
      document.getElementById('recordSpin2').classList.remove('recordSpinActive');
      playButton.innerText = 'START';
    }
  }
  keepTime () {
    let count = this.state.count;
    let timer = setInterval(() => {
    if (this.state.playing===true && this.state.reverse===false && this.state.forward===false) {
      count=count+1;
      this.setState({
        count:count
      })
    } else if (this.state.playing===true && this.state.reverse===true) {
      count=count-1;
      this.setState({
        count:count,
        timeReversed:true
      })
    } else if (this.state.playing===true && this.state.forward===true) {
      count=count+2;
      this.setState({
        count:count,
        timeForwarded:true
      })
    }
    }, 1000);
    if (this.state.playing===false) {
        clearInterval(timer);
        console.log('cleared')
         this.setState({
            timeForwarded:false,
            reverse:false,
            forward:false
          });
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
    let delay = this.state.delay;
    if (this.state.audio !== 'none' && delay.wet.value===0 ) {
      delay.wet.value=1;
    } else if (delay.wet.value===1) {
      delay.wet.value=0;
    }
  }
  reverse () {
    let audio = this.state.audio;
    let rev = document.getElementById('record2rewind');
    if (this.state.reverse===false) {
      this.setState({
        reverse:true
      })
      document.getElementById('recordSpin2').classList.add('recordRevSpinActive');
      this.keepTime();
    }
    rev.addEventListener('mouseup', ()=> {
      this.setState({
        playing:false
      })
      this.keepTime();
      audio.stop();
      document.getElementById('recordSpin2').classList.remove('recordRevSpinActive');
      document.getElementById('playButton2').innerText = 'START';
      this.play();
     })
   }
  forward () {
    let audio = this.state.audio;
    let forward = document.getElementById('record2forward');
    if (this.state.forward===false) {
      this.setState({
        forward:true
      })
      document.getElementById('recordSpin2').classList.add('recordForwardSpinActive');
      this.keepTime();
    }
    forward.addEventListener('mouseup', ()=> {
      this.setState({
        playing:false
      })
      document.getElementById('recordSpin2').classList.remove('recordForwardSpinActive');
      this.keepTime();
      audio.stop();
      document.getElementById('playButton2').innerText = 'START';
      this.play();
     })
   }
  render() {
    return (
      <div>
      <ul className="recordsUL hide" id="record2UL">
        <li className="recordTitles" id={require('../../assets/images/tribe_bonita.jpeg')} title="3ttkerbsu3" ref={(list) => {this.list1 = list; }} onClick={() => {this.changeRecord(this.list1) }}>Bonita Applebum (Instrumental) | A Tribe Called Quest</li>
        <li className="recordTitles" id={require('../../assets/images/tribe_kickit.jpeg')} title="wgon64j4gd" ref={(list) => {this.list2 = list; }} onClick={() => {this.changeRecord(this.list2) }}>Can I Kick It (Instrumental) | A Tribe Called Quest</li>
        <li className="recordTitles" id={require('../../assets/images/tribe2.jpeg')} title="uwzeiup27a" ref={(list) => {this.list3 = list; }} onClick={() => {this.changeRecord(this.list3) }}>Electric Relaxation | A Tribe Called Quest</li>
        <li className="recordTitles" id={require('../../assets/images/aretha_onestep.jpeg')} title="3r37zffqso" ref={(list) => {this.list4 = list; }} onClick={() => {this.changeRecord(this.list4) }}>One Step Ahead | Aretha Franklin</li>
        <li className="recordTitles" id={require('../../assets/images/charlie_talk.jpeg')} title="dhq57p2vdx" ref={(list) => {this.list5 = list; }} onClick={() => {this.changeRecord(this.list5) }}>We Don't talk anymore (Acapella) | Charlie Puth</li>
        <li className="recordTitles" id={require('../../assets/images/whereareyou.jpeg')} title="ttjjew5mue" ref={(list) => {this.list6 = list; }} onClick={() => {this.changeRecord(this.list6) }}>Where Are You Now (Instrumental) - Skrillex & Diplo ft. Justin Bieber</li>
        <li className="recordTitles" id={require('../../assets/images/common_usedto.jpeg')} title="f2rhkuml50" ref={(list) => {this.list7 = list; }} onClick={() => {this.changeRecord(this.list7) }}>I Used To Love H.E.R. (Acapella) | Common</li>
        <li className="recordTitles" id={require('../../assets/images/disclosure_latch.png')} title="azsp6164z4" ref={(list) => {this.list8 = list; }} onClick={() => {this.changeRecord(this.list8) }}>Latch (Instrumental) | Disclosure ft. Sam Smith</li>
        <li className="recordTitles" id={require('../../assets/images/justinbeiber_letme.jpeg')} title="ne9qljntmf" ref={(list) => {this.list9 = list; }} onClick={() => {this.changeRecord(this.list9) }}>Let Me Love You (Andrew Watt Acoustic) | DJ Snake ft. Justin Bieber</li>
        <li className="recordTitles" id={require('../../assets/images/pharcyde.jpeg')} title="vvfizvnoe1" ref={(list) => {this.list10 = list; }} onClick={() => {this.changeRecord(this.list10) }}>Runnin' (Instrumental) | The Pharcyde</li>
        <li className="recordTitles" id={require('../../assets/images/dilla_sofar.jpeg')} title="oeoo5ouwel" ref={(list) => {this.list11 = list; }} onClick={() => {this.changeRecord(this.list11) }}>So Far To Go (Instrumental) | J Dilla</li>
        <li className="recordTitles" id={require('../../assets/images/jamesbrown_funky.jpeg')} title="2os948xe96" ref={(list) => {this.list12 = list; }} onClick={() => {this.changeRecord(this.list12) }}>Funky Drummer | James Brown</li>
        <li className="recordTitles" id={require('../../assets/images/jamesbrown_machine.jpeg')} title="5eggxa62k3" ref={(list) => {this.list13 = list; }} onClick={() => {this.changeRecord(this.list13) }}>Sex Machine | James Brown</li>
        <li className="recordTitles" id={require('../../assets/images/lauryn_thatthing.jpeg')} title="sow56bmfgc" ref={(list) => {this.list14 = list; }} onClick={() => {this.changeRecord(this.list14) }}>That Thing (Acapella) | Lauryn Hill</li>
        <li className="recordTitles" id={require('../../assets/images/justinbeiber_letme.jpeg')} title="cmlizavpp6" ref={(list) => {this.list15 = list; }} onClick={() => {this.changeRecord(this.list15) }}>Let Me Love You (Acapella...Almost) | Justin Bieber</li>
        <li className="recordTitles" id={require('../../assets/images/coldwater.jpeg')} title="484y8cf45u" ref={(list) => {this.list16 = list; }} onClick={() => {this.changeRecord(this.list16) }}>Cold Water ft. Justin Bieber & MØ (Instrumental) | Major Lazer</li>
        <li className="recordTitles" id={require('../../assets/images/leanon.jpeg')} title="whe0lrhl1i" ref={(list) => {this.list17 = list; }} onClick={() => {this.changeRecord(this.list17) }}>Lean On (Instrumental) | Major Lazer & DJ Snake & MØ</li>
        <li className="recordTitles" id={require('../../assets/images/leanon.jpeg')} title="gssvww47gj" ref={(list) => {this.list18 = list; }} onClick={() => {this.changeRecord(this.list18) }}>Lean On (Acapella) | Major Lazer & DJ Snake & MØ</li>
        <li className="recordTitles" id={require('../../assets/images/frontin.jpeg')} title="4f2aknr9uq" ref={(list) => {this.list19 = list; }} onClick={() => {this.changeRecord(this.list19) }}>Frontin' (Acapella) | Pharrell</li>
        <li className="recordTitles" id={require('../../assets/images/Pharrell_Williams_Happy.jpeg')} title="ljetsb40xq" ref={(list) => {this.list20 = list; }} onClick={() => {this.changeRecord(this.list20) }}>Happy (Acapella) | Pharrell</li>
        <li className="recordTitles" id={require('../../assets/images/qtip_letsride.jpeg')} title="0gmgwfhffk" ref={(list) => {this.list21 = list; }} onClick={() => {this.changeRecord(this.list21) }}>Let's Ride (Instrumental) | Q-Tip</li>
        <li className="recordTitles" id={require('../../assets/images/blurredlines.png')} title="8trcmqgwqc" ref={(list) => {this.list22 = list; }} onClick={() => {this.changeRecord(this.list22) }}>Blurred Lines ft. T.I. & Pharrell (Acapella) | Robin Thicke</li>
        <li className="recordTitles" id={require('../../assets/images/slumv.jpeg')} title="wtx2womqmj" ref={(list) => {this.list23 = list; }} onClick={() => {this.changeRecord(this.list23) }}>Fall in Love (Instrumental) | Slum Village</li>
        <li className="recordTitles" id={require('../../assets/images/hakuma.jpeg')} title="wzpkf6kisq" ref={(list) => {this.list24 = list; }} onClick={() => {this.changeRecord(this.list24) }}>Hakuna Matata | The Lion King</li>
      </ul>
        <h2 className="chooseRecord" id="chooseRecord2" onClick={this.showRecords}>{this.state.record}</h2>
        <div className="turnMix">
          <div className="mixer" id="mixer2">
            <h3 className="mixerTitle">{this.state.record}</h3>
            <div className="filtersContainer">
              <div className="filters" id="record2HP" onClick={this.highPassFilter}>HP</div>
              <div className="filters" id="record2LP" onClick={this.lowPassFilter}>LP</div>
              <div className="filters" id="record2delay" onClick={this.delay}>Echo</div>
            </div>
            <div className="bpmPitch">
              <div>
                <div className="bpmUp" id="record2bpmUp" onClick={this.raiseBMP}></div>
                <p>BPM</p>
                <div className="bpmDown" id="record2bpmDown" onClick={this.lowerBMP}></div>
              </div>
              <div>
                <div className="pitchUp" id="record2pitchUp" onClick={this.raisePitch}></div>
                <p>PITCH</p>
                <div className="pitchDown" id="record2pitchDown" onClick={this.lowerPitch}></div>
            </div>
            </div>
            <div className="gain">
              <div className="volumeUp" id="record2gain" onClick={this.raiseGain}></div>
              <p>GAIN</p>
              <div className="volumeDown" id="record2subgain" onClick={this.lowerGain}></div>
            </div>
            <div className="loopRew">
              <div className="rewind" id="record2rewind" onMouseDown={this.reverse}></div>
              <div className="forward" id="record2forward" onMouseDown={this.forward}></div>
            </div>
          </div>
          <div className="turntable">
            <div className="recordSpin hide" id="recordSpin2">
              <div className="recordImg" id="recordImg2"></div>
            </div>
            <div className="play" id="playButton2" onClick={this.play}>START</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Turntable2;
