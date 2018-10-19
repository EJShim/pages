import React, {Component} from 'react';

//Two different Components
import Intro from './Intro';
import VTKApp from './vtkapp/App';
import HomePage from './homepage/App';
import ToolBar from './ToolBar'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MainView.css';


class _MainView extends Component{
    constructor(props){
        super(props);        
    }

    render(){
        let mainContent=<Intro/>;
        if(this.props.mode =="VIEW_HOME"){
            mainContent = <HomePage/>;
        }else if(this.props.mode =="VIEW_VTK"){
            mainContent = <VTKApp/>;
        }



        return(
            <div id='Wrapper'>
                <ToolBar/>    
                {mainContent}
            </div>
            
        );
        
    }
}

_MainView.propTypes = {   
    mode : PropTypes.string
};


const mapStateToProps = (state) => ({
    mode : state.mode
});

// Store 의 view mode check
const MainView = connect(
    mapStateToProps,
)(_MainView);


export default MainView