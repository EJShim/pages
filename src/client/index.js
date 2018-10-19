import React from 'react';
import ReactDOM from 'react-dom';


import './index.css';
import MainViewContainer from './MainView';
import * as serviceWorker from './serviceWorker';
import K_Manager from 'K_Manager';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Initialize Manager
K_Manager.New();
const store = createStore(K_Manager.GUIManager().SetViewMode);

// Render GUI
ReactDOM.render(
    <Provider store={store}>
        <MainViewContainer />
    </Provider>
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
