import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'serviceWorker';
//Module
import App from 'App';
import K_Manager from 'K_Manager';


// Initialize Manager
K_Manager.New();


// Render GUI
ReactDOM.render(
        <App/>
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
