import React, { Component } from 'react';

import ToolBar from './components/ToolBar';
import AsideBar from './components/AsideBar';
import Viewer from './components/Viewer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="Wrapper">
        <ToolBar/>
        <div id="Container">
        <AsideBar/>
        <Viewer/>
        </div>
      </div>
    )
  }
};

export default App;
