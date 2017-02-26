import React, { Component } from 'react';
import Header from './components/Header';
import Turntable1 from './components/Turntable1';
import Turntable2 from './components/Turntable2';
import Mixer from './components/Mixer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="djSet">
          <Turntable1 />
          <Turntable2 />
        </div>
      </div>
    );
  }
}

export default App;
