import React, {Component} from 'react';

import './AsideBar.css';

export default class AsideBar extends Component {

    render() {
        return (
            <div className='aside-bar'>
                <ul>
                    <li className='aside-bar-title'>TITLE</li>
                    <li><a>source1</a></li>
                    <li><a>source2</a></li>
                    <li><a>source3</a></li>
                    <li><a>source4</a></li>
                </ul>
            </div>
        );
    };
}

