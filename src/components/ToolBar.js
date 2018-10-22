import React from 'react';
import styled, {keyframes} from 'styled-components';




const _ToolBar = styled.div`
    
    display: flex;
    flex-basis: min-content;
    background: rgba(32, 32, 32, 1.0); 

    div{
        border-radius: 25px;
        margin:10px;
        padding:10px;
        background-color:rgba(32, 32, 128, 0.0);        
        user-select: none;
        font-family: "Times New Roman", Times, serif;            
        color:white;        
    }

    div:hover{
        cursor: pointer;
        background-color:rgb(128, 32, 32);        
    }

    div:last-child{
        margin-left: auto;
        background-color:rgba(0, 0, 0, 0);
    }
`;

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
            <_ToolBar>
                <div onClick={this.props.changeView}>Home</div>
                <div onClick={this.props.changeView}>Portfolio</div>
                <div onClick={this.props.changeView}>Video</div>
                <div onClick={this.props.changeView}>VTK</div>
                <div class="logo">EJ Shim</div>
            </_ToolBar>            
        );
    }
}

export default ToolBar;