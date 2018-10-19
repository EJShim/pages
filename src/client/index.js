import React from 'react';
import ReactDOM from 'react-dom';


import './index.css';
import MainView from './MainView';
import * as serviceWorker from './serviceWorker';
import K_Manager from 'K_Manager';

// Initialize Manager
K_Manager.New();

// Render GUI
ReactDOM.render(<MainView />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
