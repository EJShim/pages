import React, {Component} from 'react';

import './ToolBar.css';

export default class ToolBar extends Component {
    constructor(props){
        super(props);
    }
    testImport(){
        console.log("Import button clicked");
    }

    render() {
        let buttons = [];

        if(this.props.currentView == "HOMEPAGE"){
            buttons = [
                <li><a>Intro</a></li>,
                <li><a>Portfolio</a></li>,
                <li><a>Videos</a></li>,
            ];
        }else if(this.props.currentView == "VTK"){
            buttons = [
                <li><a onClick={this.testImport.bind(this)}>Import</a></li>,
                <li><a>Edit</a></li>,
                <li><a>Setting</a></li>,
                <li><a>Help</a></li>,
            ];
        }


        return (
            <div className='tool-bar'>
                <ul>
                    {buttons}
                    <li><a onClick={this.props.showVTK}>Mode:VTK</a></li>
                    <li><a onClick={this.props.showHomepage}>Mode:HOMEPAGE</a></li>
                </ul>
            </div>
        );
    };
}

