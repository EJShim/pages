import React, {Component} from 'react';
import K_Manager from 'K_Manager'

import './Viewer.css';

export default class Viewer extends Component {

    componentDidMount(){
        //After render() function
        K_Manager.AddRenderer( document.querySelector('#viewer1') );
        K_Manager.AddRenderer( document.querySelector('#viewer2') );
        K_Manager.AddRenderer( document.querySelector('#viewer3') );
        K_Manager.AddRenderer( document.querySelector('#viewer4') );
        K_Manager.Redraw();
    }

    componentWillUnmount(){
        K_Manager.Clear();
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

