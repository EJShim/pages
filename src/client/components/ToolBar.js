import React, {Component} from 'react';

import './ToolBar.css';

export default class ToolBar extends Component {

    render() {
        return (
            <div className='tool-bar'>
                <ul>
                    <li><a>Import</a></li>
                    <li><a>Edit</a></li>
                    <li><a>Setting</a></li>
                    <li><a>Help</a></li>
                    <li><a>JUNE_LAP</a></li>
                </ul>
            </div>
        );
    };
}

