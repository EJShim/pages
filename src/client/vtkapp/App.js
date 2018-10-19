import React, { Component } from 'react';
import AsideBar from './components/AsideBar';
import Viewer from './components/Viewer';
import './App.css';

class VTKApp extends Component {
  render() {
    return (      
      <div id="Container">
        <AsideBar/>
        <Viewer/>
      </div>
    )
  }
};

export default VTKApp;
