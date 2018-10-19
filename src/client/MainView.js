import React, {Component} from 'react';

//Two different Components
import Intro from './Intro';
import VTKApp from './vtkapp/App';
import HomePage from './homepage/App';
import ToolBar from './ToolBar'
import './MainView.css';


class MainView extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentView:'SELECT',
            testSomething:false
        }
    }

    onShowHomepage(){
        this.setState(
            state=>({
                currentView:'HOMEPAGE'
            })
        );
    }

    onShowVTK(){
        this.setState(
            state=>({
                currentView:'VTK'
            })
        );
    }


    render(){
        
        let mainContent=<Intro/>;

        if(this.state.currentView =="HOMEPAGE"){
            mainContent = <HomePage/>;
        }else if(this.state.currentView =="VTK"){
            mainContent = <VTKApp/>;
        }



        return(
            <div id='Wrapper'>
                <ToolBar currentView={this.state.currentView} showHomepage={this.onShowHomepage.bind(this)} showVTK={this.onShowVTK.bind(this)}/>    
                {mainContent}
            </div>
            
        );
        
    }
}

export default MainView