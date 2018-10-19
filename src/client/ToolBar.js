import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as types from 'ActionTypes';

import './ToolBar.css';

class _ToolBar extends Component {
    constructor(props){
        super(props);
    }
    testImport(){
        console.log("Import button clicked");
    }

    render() {
        let buttons = [];

        if(this.props.mode == "VIEW_HOME"){
            buttons = [
                <li><a>Intro</a></li>,
                <li><a>Portfolio</a></li>,
                <li><a>Videos</a></li>,
            ];
        }else if(this.props.mode == "VIEW_VTK"){
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
                    <li><a onClick={this.props.ShowVTK}>Mode:VTK</a></li>
                    <li><a onClick={this.props.ShowHome}>Mode:HOMEPAGE</a></li>
                </ul>
            </div>
        );
    };
}

_ToolBar.propTypes = {   
    mode : PropTypes.string,
    ShowVTK : PropTypes.func,
    ShowHome : PropTypes.func
};

const mapStateToProps = (state) => ({
    mode: state.mode
});


const mapDispatchToProps = (dispatch) => ({
    ShowVTK : () => dispatch({type:types.VIEW_VTK}),
    ShowHome: () => dispatch({type:types.VIEW_HOME})
});

const ToolBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToolBar);

export default ToolBar