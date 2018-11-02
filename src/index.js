import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import {createStore} from 'redux';
//Module
import App from 'App';
import K_Manager from 'K_Manager';


// Render GUI
ReactDOM.render(
        <Provider store={K_Manager.Mgr().store}>
                <App/>
        </Provider>
        
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
