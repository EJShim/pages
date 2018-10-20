import React from 'react';
import './ToolBar.scss'

class ToolBar extends React.Component{

    constructor(props){
        super(props);


        //Event Listner
        this.clickHome = this.clickHome.bind(this);
    }

    clickHome(e){
        e.preventDefault();
        console.log("Home Clicked")
    }

    render(){
        return(
            <div class='ToolBar'>
                <div onClick={this.clickHome}>Home</div>
                <div>Portfolio</div>
                <div>Video</div>                
            </div>            
        );
    }
}

export default ToolBar;