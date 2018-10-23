import React from 'react';
import styled, {keyframes} from 'styled-components';




const _ToolBar = styled.div`
    
    flex: 0 1 auto;
    flex-basis: min-content;
    background: rgba(85,85,85, 1.0);
    text-align:center;

    display:flex;

    div{
        display:flex;
        flex-direction:column;
        justify-content:center;
        border-radius: 25px;
        margin:10px;
        padding:5px;        
        user-select: none;
        font-family: 'Open Sans', sans-serif;
        font-weight: 800;
        font-size: 22px;
        color:#EDEDED;
        
        transition: all 1s;
    }
    div:hover{
        cursor: pointer;
        background-color:rgb(128, 32, 32);        
    }


    .logo{
        font-family: 'Mr Dafoe', cursive;
        color:rgba(41, 128, 185,1.0);
        text-shadow: #000000 3px 2px 0;
        margin-left: auto;                
    }

    .logo:hover{
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