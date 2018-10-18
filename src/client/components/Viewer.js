import React, {Component} from 'react';
import K_Manager from '../managers/K_Manager'

import './Viewer.css';

export default class Viewer extends Component {

    componentDidMount(){
        //After render() function
        K_Manager.SetRenderer( document.querySelector('#viewer1') );
        K_Manager.Redraw();
    }

    render() {
        return (
            <div className='Viewer'>
                <div id="col1" className="cols">
                    <div id="viewer1" className="viewers"></div>
                    <div id="viewer3" className="viewers"></div>
                </div>
                <div id="col3" className="cols">
                    <div id="viewer2" className="viewers"></div>
                    <div id="viewer4" className="viewers"></div>
                </div>
            </div>
        );
    };
}

